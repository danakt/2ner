import React, { useContext } from 'react';
import { InstrumentsContext } from '../contexts/InstrumentsContext';

export const InstrumentSelect = () => {
  const { instrumentsMap, activeInstrument, setActiveInstrument } = useContext(InstrumentsContext);

  return (
    <select
      onChange={(event) => {
        setActiveInstrument(event.target.value as keyof typeof instrumentsMap);
      }}
      defaultValue={activeInstrument}
    >
      {(Object.keys(instrumentsMap) as Array<keyof typeof instrumentsMap>).map((item, i) => (
        <option value={item} key={i}>
          {instrumentsMap[item].name}
        </option>
      ))}
    </select>
  );
};
