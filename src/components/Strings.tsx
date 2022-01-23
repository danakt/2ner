import React, { useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { getNoteNameFromPitch } from '../libs/notes';
import { InstrumentsContext } from '../contexts/InstrumentsContext';
import { PitchContext } from '../contexts/PitchContext';

const StringsWrapper = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  margin: 20px auto 0;
  width: 100%;
  min-height: 100px;
  display: flex;
  position: relative;
  justify-content: space-evenly;

  @media (min-width: 590px) {
    max-width: 700px;
  }
`;

const StringWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const StringInfo = styled.div`
  font-size: 30px;
  flex: 0 0 60px;

  .selected & {
    color: #428bca;
  }
`;

type TString = { size: number };
const String = styled.div`
  width: 100%;
  height: 100%;
  transition: color 0.15s ease-out;
  text-align: center;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    display: block;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props: TString) => props.size}px;
    background-color: #ebebeb;
    transition: background-color 0.15s ease-out;
  }

  .selected &::after {
    background-color: #428bca;
  }
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
          <StringWrapper
            key={i}
            onClick={() => {
              setActiveStringIndex(i);
              setAutoSelectEnabled(false);
            }}
            className={classNames({ selected: i === activeStringIndex })}
          >
            <StringInfo>{getNoteNameFromPitch(item)}</StringInfo>

            <String size={getStringSize(item)} />
          </StringWrapper>
        ))}
      </StringsWrapper>
    </React.Fragment>
  );
};
