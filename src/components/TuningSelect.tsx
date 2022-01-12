import React, { useContext } from 'react';
import { InstrumentsContext } from '../contexts/InstrumentsContext';
import { getNoteNameFromPitch } from '../libs/notes';

export const TuningSelect = () => {
  const { instrumentsMap, activeInstrument, activeTuningIndex, setActiveTuningIndex } = useContext(InstrumentsContext);

  const { tunings } = instrumentsMap[activeInstrument];
  const groupTuningMap = tunings.reduce<Record<string, ITuning[]>>(
    (acc, item) => ({
      ...acc,
      [item.group ?? '']: [...(acc[item.group ?? ''] ?? []), item],
    }),
    {}
  );

  return (
    <div>
      Строй:{' '}
      <select
        onChange={(event) => {
          setActiveTuningIndex(Number(event.target.value));
        }}
        defaultValue={activeTuningIndex}
        key={activeInstrument}
      >
        {Object.keys(groupTuningMap).map((key, i) => {
          const optionsRender = groupTuningMap[key].map((tuning, i) => (
            <option value={i} key={i}>
              {tuning.name} ({tuning.pitchList.map((pitch) => getNoteNameFromPitch(pitch)).join(' ')})
            </option>
          ));

          return key === '' ? (
            optionsRender
          ) : (
            <optgroup label={key} key={key}>
              {optionsRender}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
};
