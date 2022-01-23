import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { InstrumentsContext } from '../contexts/InstrumentsContext';
import { getNoteNameFromPitch } from '../libs/notes';
import arrowIcon from '../icons/angle-arrow-down.png';

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  @media (min-width: 590px) {
    width: auto;
    justify-content: center;
  }
`;

const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
  background: url(${arrowIcon}) 100% 60% no-repeat;
  background-size: 12px;

  @media (min-width: 590px) {
    width: auto;
  }
`;

const Select = styled.select`
  appearance: none;
  opacity: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const TuneNotes = styled.span`
  opacity: 0.5;
`;

export const TuningSelect = () => {
  const { instrumentsMap, activeInstrument, activeTuningIndex, setActiveTuningIndex } = useContext(InstrumentsContext);

  const selectRef = useRef<HTMLSelectElement>(null);

  const { tunings } = instrumentsMap[activeInstrument];
  const groupTuningMap = tunings.reduce<Record<string, ITuning[]>>(
    (acc, item) => ({
      ...acc,
      [item.group ?? '']: [...(acc[item.group ?? ''] ?? []), item],
    }),
    {}
  );

  return (
    <Wrapper>
      <SelectWrapper>
        Строй: {tunings[activeTuningIndex].name}{' '}
        <TuneNotes className="sans-serif">
          ({tunings[activeTuningIndex].pitchList.map((pitch) => getNoteNameFromPitch(pitch)).join(' ')})
        </TuneNotes>
        <Select
          ref={selectRef}
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
        </Select>
      </SelectWrapper>
    </Wrapper>
  );
};
