import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { getPitch } from '../libs/audio';
import { throttle } from '../utils/throttle';
import { InstrumentsContext } from './InstrumentsContext';
import { useLatest } from '../hooks/useLatest';
import { PITCH_RANGE } from '../constants/indicator';

export type MediaContextData = {
  /** Size of audio buffer */
  bufferSize: number;
  /** Audio stream */
  audioStream?: MediaStream | null;
  /** Current audio pitch */
  currentPitch: number | null;
  /** Current audio pitch to display */
  displayedPitch: number;
  /** Percentage of tuning from -1 to 1; 0 — is a tuned sound */
  pitchPercent: number;
  /** Current audio buffer */
  currentBuffer?: Float32Array;
  /** Sets audio stream */
  setAudioStream(stream?: MediaStream | null): void;
  /** Updates the pitch */
  updatePitch(pitch: number, buffer?: Float32Array): void;
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
  } = useContext(InstrumentsContext);

  const bufferSize = 2048;

  const [audioStream, setAudioStream] = useState<MediaStream | null>();
  const [currentBuffer, setCurrentBuffer] = useState<Float32Array>();
  const [currentPitch, setCurrentPitch] = useState<number | null>(null);
  const [displayedPitch, setDisplayedPitch] = useState<number>(0);
  const [pitchPercent, setPitchPercent] = useState<number>(0);
  const latestPitchRef = useLatest(displayedPitch);

  const updatePitch = (pitch: number | null, buffer?: Float32Array) => {
    setCurrentBuffer(buffer);
    setCurrentPitch(pitch);
  };

  useEffect(() => {
    if (audioStream != null) {
      const throttledPitchUpdate = throttle(100, (pitch: number | null, buffer?: Float32Array) => {
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

  useEffect(() => {
    const soughtPitch = pitchList[currentStringIndex];
    const [minPitch, maxPitch] = [
      soughtPitch - PITCH_RANGE / 2, //
      soughtPitch + PITCH_RANGE / 2,
    ];

    if (currentPitch == null || currentPitch < minPitch || currentPitch > maxPitch) {
      return;
    }

    const interpolatedValue =
      latestPitchRef.current != null && !isNaN(latestPitchRef.current)
        ? latestPitchRef.current + (currentPitch - latestPitchRef.current) / 3
        : currentPitch;

    setDisplayedPitch(interpolatedValue);
    setPitchPercent((currentPitch - soughtPitch) / PITCH_RANGE);
  }, [currentPitch, pitchList, currentStringIndex]);

  return (
    <MediaContext.Provider
      value={{
        bufferSize,
        audioStream,
        currentPitch,
        displayedPitch,
        pitchPercent,
        currentBuffer,
        setAudioStream,
        updatePitch,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
};
