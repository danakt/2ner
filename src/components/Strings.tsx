import React, { useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { getNoteNameFromPitch } from '../libs/notes';
import { InstrumentsContext } from '../contexts/InstrumentsContext';
import { MediaContext } from '../contexts/MediaContext';

export const StringsWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;
  height: 400px;
  width: 100%;
`;

type TString = { size: number };

export const String = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  padding: 20px 0;
  color: #999;
  transition: color 0.15s ease-out;

  &::after {
    content: '';
    display: block;
    /* position: absolute; */
    width: 100%;
    height: ${(props: TString) => props.size}px;
    top: 50%;
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
  font-size: 16px;
`;

export const Strings = () => {
  const {
    currentTuning: { pitchList },
    currentStringIndex,
    changeString,
  } = useContext(InstrumentsContext);

  return (
    <React.Fragment>
      <StringsWrapper>
        {pitchList.map((item, i) => (
          <String
            key={item}
            size={pitchList.length - i * 0.7 + 1}
            className={classNames({ selected: i === currentStringIndex })}
            onClick={() => changeString(i)}
          >
            <StringInfo>
              {getNoteNameFromPitch(item)} {item.toFixed(2)} Hz
            </StringInfo>
          </String>
        ))}
      </StringsWrapper>
    </React.Fragment>
  );
};
