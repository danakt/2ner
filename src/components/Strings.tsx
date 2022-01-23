import React, { useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { getNoteNameFromPitch } from '../libs/notes';
import { InstrumentsContext } from '../contexts/InstrumentsContext';
import { PitchContext } from '../contexts/PitchContext';

export const StringsWrapper = styled.div`
  margin: 20px auto 0;
  max-width: 735px;
  height: 300px;
  display: flex;
  position: relative;
  justify-content: space-evenly;
`;

type TString = { size: number };

export const String = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  padding: 10px 0;
  transition: color 0.15s ease-out;
  text-align: center;

  &::after {
    content: '';
    display: block;
    margin-top: 20px;
    position: absolute;
    height: 100%;
    width: ${(props: TString) => props.size}px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ebebeb;
    transition: background-color 0.15s ease-out;
  }

  &.selected {
    color: #428bca;

    &::after {
      background-color: #428bca;
    }
  }
`;

export const StringInfo = styled.div`
  font-size: 30px;
`;

const getStringSize = (hz: number) => {
  const maxPitch = 1000;

  return Math.max(2, (maxPitch - hz) ** 4 / 1e11);
};

export const Strings = () => {
  const { instrumentsMap, activeInstrument, activeTuningIndex, activeStringIndex, setActiveStringIndex } =
    useContext(InstrumentsContext);
  const { setAutoSelectEnabled } = useContext(PitchContext);
  const { pitchList } = instrumentsMap[activeInstrument].tunings[activeTuningIndex];

  return (
    <React.Fragment>
      <StringsWrapper>
        {pitchList.map((item, i) => (
          <String
            key={i}
            size={getStringSize(item)}
            className={classNames({ selected: i === activeStringIndex })}
            onClick={() => {
              setActiveStringIndex(i);
              setAutoSelectEnabled(false);
            }}
          >
            <StringInfo>{getNoteNameFromPitch(item)}</StringInfo>
          </String>
        ))}
      </StringsWrapper>
    </React.Fragment>
  );
};
