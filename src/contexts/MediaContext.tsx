import React, {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { getPitch } from '../libs/audio';
import { throttle } from '../utils/throttle';
import { InstrumentsContext } from './InstrumentsContext';
import { useLatest } from '../hooks/useLatest';
import { AUTO_SELECT_PITCH_RANGE, TUNING_PITCH_RANGE } from '../constants/indicator';

const PITCH_UPDATE_TIME = 20;

export type MediaContextData = {
  audioStream?: MediaStream | null;
  currentPitchRef: MutableRefObject<number | null>;
  /** Current audio pitch to display */
  currentBufferRef: MutableRefObject<Float32Array | undefined>;
  requestAudio(): Promise<void>;
};

export const MediaContext = createContext<MediaContextData>({} as any);

/**
 * Gets and starts process the audio stream, sending gotten pitch to callback
 * @returns Function to stop the audio stream processing
 */
export function startAudioProcessing(
  audioStream: MediaStream,
  bufferSize: number = 2 ** 11,
  callback: (pitch: number | null, buffer?: Float32Array) => void
) {
  const audioContext = new AudioContext();
  audioContext.resume();

  const src: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(audioStream);
  const analyser: AnalyserNode = audioContext.createAnalyser();
  const script: ScriptProcessorNode = audioContext.createScriptProcessor(bufferSize, 1, 1);

  src.connect(analyser);
  analyser.connect(script);
  script.connect(audioContext.destination);

  /**
   * Handler of audio process event
   * @param {AudioProcessingEvent} event
   */
  const handleAudioProcess = function handleAudioProcess(event: AudioProcessingEvent): void {
    const buffer: Float32Array = event.inputBuffer.getChannelData(0).slice();
    const pitch = getPitch(buffer, audioContext.sampleRate);

    callback(pitch, buffer);
  };

  script.addEventListener('audioprocess', handleAudioProcess);

  return function stopAudioProcessing() {
    audioStream.getTracks().forEach((track) => track.stop());
    src.disconnect();
    analyser.disconnect();
    script.removeEventListener('audioprocess', handleAudioProcess);
    script.disconnect();
    audioContext.close();
  };
}

export const MediaContextProvider = (props: PropsWithChildren<{}>) => {
  const bufferSize = 2048;

  const [audioStream, setAudioStream] = useState<MediaStream | null>();
  const currentBufferRef = useRef<Float32Array>();
  const currentPitchRef = useRef<number | null>(null);

  const updatePitch = (pitch: number | null, buffer?: Float32Array) => {
    currentBufferRef.current = buffer;
    currentPitchRef.current = pitch;
  };

  const requestAudio = async () => {
    // Getting media stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setAudioStream(stream);
    } catch (err) {
      // TODO: handle the error

      setAudioStream(null);
    }
  };

  // // Auto request audio on desktop
  // useEffect(() => {
  //   console.log((navigator as any).userAgentData.mobile);
  //   if (!(navigator as any).userAgentData.mobile) {
  //     requestAudio();
  //   }
  // }, []);

  useEffect(() => {
    if (audioStream != null) {
      const throttledPitchUpdate = throttle(PITCH_UPDATE_TIME, (pitch: number | null, buffer?: Float32Array) => {
        if (pitch == null) {
          updatePitch(null, buffer);
          return;
        }

        updatePitch(pitch, buffer);
      });

      const stopAudioProcessing = startAudioProcessing(audioStream, bufferSize, throttledPitchUpdate);

      return () => {
        stopAudioProcessing();
      };
    }
  }, [audioStream]);

  return (
    <MediaContext.Provider
      value={{
        audioStream,
        currentPitchRef,
        currentBufferRef,
        requestAudio,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
};
