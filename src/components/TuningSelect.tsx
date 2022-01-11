import React, { useContext } from 'react';
import { InstrumentsContext } from '../contexts/InstrumentsContext';
import { getNoteNameFromPitch } from '../libs/notes';

export const TuningSelect = () => {
  const { instrumentsMap, activeInstrument, activeTuningIndex, setActiveTuningIndex } = useContext(InstrumentsContext);

  return (
    <select
      onChange={(event) => {
        setActiveTuningIndex(Number(event.target.value));
      }}
      defaultValue={activeTuningIndex}
      key={activeInstrument}
    >
      {instrumentsMap[activeInstrument].tunings.map((item, i) => (
        <option value={i} key={i}>
          {item.name} ({item.pitchList.map((pitch) => getNoteNameFromPitch(pitch)).join(' ')})
        </option>
      ))}
    </select>
  );
};
