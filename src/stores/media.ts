import { observable, action } from 'mobx'
import { startAudioProcessing } from '~/libs/audio'
import { throttle } from '~/utils/throttle'

export class StoreMedia {
  /** Variable for saving function to cancel pitch update */
  private _stopAudioProcessing: void | VoidFunction = undefined

  /** Size of audio buffer */
  @observable public bufferSize: number = 2048

  /** Audio stream */
  @observable public audioStream: MediaStream | null | void = undefined

  /** Current audio pitch */
  @observable public currentPitch = 0

  /** Current audio buffer */
  @observable public currentBuffer: Float32Array | void = undefined

  /**
   * Sets audio stream
   * @param {MediaStream} stream
   */
  @action
  public async setAudioStream(stream: MediaStream | void | null) {
    this.audioStream = stream

    // Stop previous audio processing
    if (typeof this._stopAudioProcessing === 'function') {
      this._stopAudioProcessing()
    }

    // Set new pitch updating
    if (stream != null) {
      const throttledPitchUpdate = throttle(
        30,
        (pitch: number, buffer?: Float32Array) =>
          this.updatePitch(pitch, buffer)
      )

      this._stopAudioProcessing = await startAudioProcessing(
        stream as MediaStream,
        this.bufferSize,
        (pitch, buffer) => {
          throttledPitchUpdate(pitch, buffer)
        }
      )
    }
  }

  /**
   * Updates the pitch
   * @param pitch The pitch
   */
  @action
  public updatePitch(pitch: number, buffer?: Float32Array) {
    this.currentBuffer = buffer
    this.currentPitch = pitch
  }
}

export const storeMedia = new StoreMedia()
