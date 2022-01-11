import React, { createContext, PropsWithChildren, useLayoutEffect, useState } from 'react';
import * as instrumentsMap from '../constants/instruments';

type Instruments = typeof instrumentsMap;
type InstrumentName = keyof Instruments;

const DEFAULT_INSTRUMENT = Object.keys(instrumentsMap)[0] as InstrumentName;

export type InstrumentsContextData = {
  instrumentsMap: Instruments;
  activeInstrument: InstrumentName;
  activeTuningIndex: number;
  activeStringIndex: number;
  setActiveInstrument: (instrumentName: InstrumentName) => void;
  setActiveTuningIndex: (newTuningIndex: number) => void;
  setActiveStringIndex: (newStringIndex: number) => void;
};

export const InstrumentsContext = createContext<InstrumentsContextData>({} as any);

export const InstrumentsContextProvider = (props: PropsWithChildren<{}>) => {
  const [activeInstrumentName, setActiveInstrumentName] = useState<InstrumentName>(DEFAULT_INSTRUMENT);
  const [activeTuningIndex, setActiveTuningIndex] = useState(0);
  const [activeStringIndex, setActiveStringIndex] = useState(0);

  const setActiveInstrument = (instrumentName: InstrumentName) => {
    setActiveTuningIndex(0);
    setActiveInstrumentName(instrumentName);
  };

  return (
    <InstrumentsContext.Provider
      value={{
        instrumentsMap,
        activeInstrument: activeInstrumentName,
        activeTuningIndex,
        activeStringIndex,
        setActiveInstrument,
        setActiveTuningIndex,
        setActiveStringIndex,
      }}
    >
      {props.children}
    </InstrumentsContext.Provider>
  );
};
