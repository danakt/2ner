/**
 * Calculates root mean square of audio buffer
 * @private
 * @param  {Float32Array} audioBuffer
 * @return {number}
 */
function calculateRMS(audioBuffer: Float32Array): number {
  const bufLength = audioBuffer.length

  const rms: number = audioBuffer.reduce((acc: number, item: number) => {
    return acc + item ** 2
  }, 0)

  return Math.sqrt(rms / bufLength)
}

/**
 * Returns pitch from audio buffer
 * @param  {Float32Array} audioBuffer
 * @param  {number} sampleRate
 * @return {number}
 */
export function getPitch(
  audioBuffer: Float32Array,
  sampleRate: number
): number {
  const SIZE = audioBuffer.length
  const MAX_SAMPLES = Math.floor(SIZE / 2)
  const MIN_SAMPLES = 0

  const rms = calculateRMS(audioBuffer)
  const correlations = new Array(MAX_SAMPLES)

  let bestOffset = -1
  let bestCorrelation = 0
  let foundGoodCorrelation = false
  let correlation

  // Not enough signal
  if (rms < 0.01) {
    return -1
  }

  let lastCorrelation = 1

  for (let offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
    correlation = 0

    for (let i = 0; i < MAX_SAMPLES; i++) {
      correlation += Math.abs(audioBuffer[i] - audioBuffer[i + offset])
    }

    correlation = 1 - correlation / MAX_SAMPLES

    // store it, for the tweaking we need to do below.
    correlations[offset] = correlation

    if (correlation > 0.9 && correlation > lastCorrelation) {
      foundGoodCorrelation = true
      if (correlation > bestCorrelation) {
        bestCorrelation = correlation
        bestOffset = offset
      }
    } else if (foundGoodCorrelation) {
      // short-circuit - we found a good correlation, then a bad one, so we'd
      // just be seeing copies from here. Now we need to tweak the offset —
      // by interpolating between the values to the left and right of the best
      // offset, and shifting it a bit.  This is complex, and HACKY in this
      // code (happy to take PRs!) - we need to do a curve fit on
      // correlations[] around bestOffset in order to better determine precise
      // (anti-aliased) offset.
      // We know bestOffset >=1, since foundGoodCorrelation cannot go to true
      // until the second pass (offset=1), and we can't drop into this clause
      // until the following pass (else if).
      const shift
        = (correlations[bestOffset + 1] - correlations[bestOffset - 1])
        / correlations[bestOffset]

      return sampleRate / (bestOffset + 8 * shift)
    }

    lastCorrelation = correlation
  }

  if (bestCorrelation > 0.01) {
    return sampleRate / bestOffset
  }

  return -1
}

/**
 * Gets and starts process the audio stream, sending gotten pitch to callback
 * @return {Promise<Function>} Function to stop the audio stream processing
 */
export async function startAudioProcessing(
  audioStream: MediaStream,
  callback: (pitch: number) => void
): Promise<() => void> {
  const BUFFER_SIZE: number = 2 ** 11 // 2048

  const audioContext = new AudioContext()
  await audioContext.resume()

  const src: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(
    audioStream
  )
  const analyser: AnalyserNode = audioContext.createAnalyser()
  const script: ScriptProcessorNode = audioContext.createScriptProcessor(
    BUFFER_SIZE,
    1,
    1
  )

  src.connect(analyser)
  analyser.connect(script)
  script.connect(audioContext.destination)

  /**
   * Hanler of audio process event
   * @param {AudioProcessingEvent} event
   */
  const handleAudioProcess = function handleAudioProcess(
    event: AudioProcessingEvent
  ): void {
    const buffer: Float32Array = event.inputBuffer.getChannelData(0).slice()
    const pitch = getPitch(buffer, audioContext.sampleRate)

    callback(pitch)
  }

  script.addEventListener('audioprocess', handleAudioProcess)

  return function stopAudioProcessing() {
    audioStream.getTracks().forEach(track => track.stop())
    src.disconnect()
    analyser.disconnect()
    script.removeEventListener('audioprocess', handleAudioProcess)
    script.disconnect()
  }
}
