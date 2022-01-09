import React, { createContext, PropsWithChildren, useState } from 'react';
import * as instruments from '../constants/instruments';

type Instruments = typeof instruments;
type InstrumentName = keyof Instruments;

const DEFAULT_INSTRUMENT = Object.keys(instruments)[0] as InstrumentName;

export type InstrumentsContextData = {
  /** Map of instruments */
  instruments: Instruments;
  /** Current preset */
  currentInstrumentName: InstrumentName;
  /** Current tuning */
  currentTuningIndex: number;
  /** Current tuning object */
  currentTuning: ITuning;
  /** Selected string for tuning */
  currentStringIndex: number;
  /** Sets an instrument */
  changeInstrument: (newInstrumentName: InstrumentName, newTuningIndex: number) => void;
  /** Sets a tuning */
  changeTuning: (newTuningIndex: number) => void;
  /** Sets a tuning string*/
  changeString: (newStringIndex: number) => void;
};

export const InstrumentsContext = createContext<InstrumentsContextData>({} as any);

export const InstrumentsContextProvider = (props: PropsWithChildren<{}>) => {
  const [currentInstrumentName, setCurrentInstrumentName] = useState<InstrumentName>(DEFAULT_INSTRUMENT);
  const [currentTuningIndex, setCurrentTuningIndex] = useState(0);
  const [currentStringIndex, setCurrentStringIndex] = useState(0);

  /***
   * Changes the tuning
   * @param {number} newTuningIndex Index of the tuning
   */
  const changeTuning = (newTuningIndex: number) => {
    const instrument = instruments[currentInstrumentName];

    // If tuning index is not valid for the instrument
    setCurrentTuningIndex(instrument.tunings[newTuningIndex] !== undefined ? newTuningIndex : 0);
  };

  const changeInstrument = (newInstrumentName: InstrumentName, newTuningIndex: number) => {
    // If instrument name is not valid
    const instrument = instruments[newInstrumentName];
    if (!instrument) {
      return;
    }

    changeTuning(newTuningIndex);
  };

  return (
    <InstrumentsContext.Provider
      value={{
        instruments,
        currentInstrumentName,
        currentTuningIndex,
        currentStringIndex,
        get currentTuning() {
          const instrument = instruments[currentInstrumentName];
          return instrument.tunings[currentTuningIndex];
        },
        changeInstrument,
        changeTuning,
        changeString: setCurrentStringIndex,
      }}
    >
      {props.children}
    </InstrumentsContext.Provider>
  );
};
