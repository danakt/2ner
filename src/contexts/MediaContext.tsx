import React, { createContext, PropsWithChildren, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { getPitch } from '../libs/audio';
import { throttle } from '../utils/throttle';
import { InstrumentsContext } from './InstrumentsContext';
import { useLatest } from '../hooks/useLatest';
import { AUTO_SELECT_PITCH_RANGE, TUNING_PITCH_RANGE } from '../constants/indicator';

const PITCH_UPDATE_TIME = 50;

export type MediaContextData = {
  /** Audio stream */
  audioStream?: MediaStream | null;
  /** Current audio pitch */
  currentPitch: number | null;
  /** Current audio pitch to display */
  displayedPitch: number;
  /** Indication of tuning from -1 to 1; 0 — is a tuned sound.
   * The range is determined by the `PITCH_RANGE` variable */
  pitchIndicator: number;
  /** Current audio buffer */
  currentBuffer?: Float32Array;
  /** Requests user for microphone record */
  requestAudio(): Promise<void>;
  /** Toggle string autoselect by sound */
  setAutoSelectEnabled: (isEnabled: boolean) => void;
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
  const {
    currentTuning: { pitchList },
    currentStringIndex,
    changeString,
  } = useContext(InstrumentsContext);

  const bufferSize = 2048;

  const [audioStream, setAudioStream] = useState<MediaStream | null>();
  const [currentBuffer, setCurrentBuffer] = useState<Float32Array>();
  const [currentPitch, setCurrentPitch] = useState<number | null>(null);
  const [displayedPitch, setDisplayedPitch] = useState(0);
  const [pitchIndicator, setPitchIndicator] = useState(0);
  const [isAutoSelectEnabled, setAutoSelectEnabled] = useState(false);
  const latestPitchRef = useLatest(displayedPitch);

  const updatePitch = (pitch: number | null, buffer?: Float32Array) => {
    setCurrentBuffer(buffer);
    setCurrentPitch(pitch);
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

  useEffect(() => {
    if (audioStream != null) {
      const throttledPitchUpdate = throttle(PITCH_UPDATE_TIME, (pitch: number | null, buffer?: Float32Array) => {
        if (pitch == null) {
          updatePitch(null, buffer);
          return;
        }

        updatePitch(pitch, buffer);
      });

      const stopAudioProcessing = startAudioProcessing(audioStream as MediaStream, bufferSize, throttledPitchUpdate);

      return () => {
        stopAudioProcessing();
      };
    }
  }, [audioStream]);

  // Displayed pitch and pitch indicator
  useLayoutEffect(() => {
    const soughtPitch = pitchList[currentStringIndex];
    const [minPitch, maxPitch] = [soughtPitch - TUNING_PITCH_RANGE / 2, soughtPitch + TUNING_PITCH_RANGE / 2];

    if (currentPitch == null || currentPitch < minPitch || currentPitch > maxPitch) {
      return;
    }

    const interpolatedValue =
      latestPitchRef.current != null && !isNaN(latestPitchRef.current)
        ? latestPitchRef.current + (currentPitch - latestPitchRef.current) / 3
        : currentPitch;

    setDisplayedPitch(interpolatedValue);
    setPitchIndicator((currentPitch - soughtPitch) / TUNING_PITCH_RANGE);
  }, [currentPitch, pitchList, currentStringIndex]);

  // String auto select
  useLayoutEffect(() => {
    if (!isAutoSelectEnabled || currentPitch == null) {
      return;
    }

    for (let i = 0; i < pitchList.length; i++) {
      const pitch = pitchList[i];
      const [minPitch, maxPitch] = [pitch - AUTO_SELECT_PITCH_RANGE / 2, pitch + AUTO_SELECT_PITCH_RANGE / 2];

      if (currentPitch > minPitch && currentPitch < maxPitch) {
        changeString(i);
        return;
      }
    }
  }, [currentPitch, pitchList]);

  return (
    <MediaContext.Provider
      value={{
        audioStream,
        currentPitch,
        displayedPitch,
        pitchIndicator,
        currentBuffer,
        requestAudio,
        setAutoSelectEnabled,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
};
