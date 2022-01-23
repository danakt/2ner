import React, { useContext, useEffect, useLayoutEffect, useState, createContext, PropsWithChildren } from 'react';
import { AUTO_SELECT_PITCH_RANGE, TUNING_PITCH_RANGE } from '../constants/indicator';
import { InstrumentsContext } from '../contexts/InstrumentsContext';
import { MediaContext } from '../contexts/MediaContext';
import { useLatest } from '../hooks/useLatest';

const DEFAULT_UPDATE_TIME = 30;
const CORRECT_INDICATION_FAULT = 0.01;

type PitchContextData = {
  desiredPitch: number;
  currentPitch: number | null;
  currentBuffer?: Float32Array;
  displayedPitch: number;
  /** Indication of tuning from -1 to 1; 0 — is a tuned sound.
   * The range is determined by the `PITCH_RANGE` variable */
  pitchIndicator: number;
  isAutoSelectEnabled: boolean;
  isStringCorrect: boolean;
  setAutoSelectEnabled: (isEnabled: boolean) => void;
};

export const PitchContext = createContext<PitchContextData>({} as any);

type Props = PropsWithChildren<{
  updateTime?: number;
}>;

export const PitchContextProvider = ({ updateTime = DEFAULT_UPDATE_TIME, ...props }: Props) => {
  const { currentBufferRef, currentPitchRef } = useContext(MediaContext);
  const { instrumentsMap, activeInstrument, activeTuningIndex, activeStringIndex, setActiveStringIndex } =
    useContext(InstrumentsContext);

  const { pitchList } = instrumentsMap[activeInstrument].tunings[activeTuningIndex];
  const desiredPitch = pitchList[activeStringIndex];

  const [isAutoSelectEnabled, setAutoSelectEnabled] = useState(true);
  const [currentPitch, setCurrentPitch] = useState<number | null>(null);
  const [currentBuffer, setCurrentBuffer] = useState<Float32Array>();
  const [isStringCorrect, setStringCorrect] = useState(false);
  const [pitchIndicator, setPitchIndicator] = useState(0);
  const [displayedPitch, setDisplayedPitch] = useState(0);
  const latestPitchRef = useLatest(displayedPitch);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBuffer(currentBufferRef.current);
      setCurrentPitch(currentPitchRef.current);
    }, updateTime);

    return () => clearInterval(intervalId);
  }, [updateTime]);

  // Displayed pitch and pitch indicator
  useLayoutEffect(() => {
    const [minPitch, maxPitch] = [desiredPitch - TUNING_PITCH_RANGE / 2, desiredPitch + TUNING_PITCH_RANGE / 2];

    if (currentPitch == null || currentPitch < minPitch || currentPitch > maxPitch) {
      return;
    }

    const interpolatedValue =
      latestPitchRef.current != null && !isNaN(latestPitchRef.current)
        ? latestPitchRef.current + (currentPitch - latestPitchRef.current) / 3
        : currentPitch;

    setDisplayedPitch(interpolatedValue);

    const indicator = (currentPitch - desiredPitch) / TUNING_PITCH_RANGE;
    setPitchIndicator(indicator);

    setStringCorrect(indicator < CORRECT_INDICATION_FAULT && indicator > -CORRECT_INDICATION_FAULT);
  }, [currentPitch, desiredPitch]);

  // String auto select
  useLayoutEffect(() => {
    if (!isAutoSelectEnabled || currentPitch == null) {
      return;
    }

    for (let i = 0; i < pitchList.length; i++) {
      const pitch = pitchList[i];
      const [minPitch, maxPitch] = [pitch - AUTO_SELECT_PITCH_RANGE / 2, pitch + AUTO_SELECT_PITCH_RANGE / 2];

      if (currentPitch > minPitch && currentPitch < maxPitch) {
        setActiveStringIndex(i);
        return;
      }
    }
  }, [isAutoSelectEnabled, currentPitch, pitchList]);

  return (
    <PitchContext.Provider
      value={{
        desiredPitch,
        currentPitch,
        currentBuffer,
        displayedPitch,
        pitchIndicator,
        isAutoSelectEnabled,
        isStringCorrect,
        setAutoSelectEnabled,
      }}
    >
      {props.children}
    </PitchContext.Provider>
  );
};
