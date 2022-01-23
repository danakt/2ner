import React, { useContext } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { InstrumentsContext } from '../contexts/InstrumentsContext';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin: 0 -30px;
  overflow: auto;
  padding-bottom: 20px;
  justify-content: center;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }

  @media (min-width: 590px) {
    justify-content: center;
  }
`;

const InstrumentName = styled.span``;

const InstrumentButton = styled.div`
  background-image: none;
  text-align: center;
  padding: 0 5px;
  min-width: 90px;

  @media (min-width: 590px) {
    padding: 0 15px;
  }

  &:not(.active) {
    cursor: pointer;

    ${InstrumentName} {
      text-decoration: none;
      background: 0 100% repeat-x;
      background-size: 100% 1px;
      color: #5aa6e7;
      background-image: linear-gradient(rgba(90, 166, 231, 0.3), rgba(90, 166, 231, 0.3));
    }

    &:active,
    &:hover,
    &:focus {
      background-image: none;

      & ${InstrumentName} {
        color: rgb(255, 0, 0);
        background-image: linear-gradient(rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0.3));
      }
    }
  }
`;

const InstrumentIcon = styled.div`
  width: 64px;
  height: 64px;
  background: 50% no-repeat;
  background-size: contain;
  margin: 0 auto;

  @media (min-width: 590px) {
    width: 72px;
    height: 72px;
  }
`;

export const InstrumentSelect = () => {
  const { instrumentsMap, activeInstrument, setActiveInstrument } = useContext(InstrumentsContext);

  return (
    <Wrapper>
      {(Object.keys(instrumentsMap) as Array<keyof typeof instrumentsMap>).map((item, i) => (
        <InstrumentButton
          key={i}
          className={classNames('sans-serif', { active: activeInstrument === item })}
          onClick={() => {
            setActiveInstrument(item);
          }}
        >
          {/* <InstrumentIcon style={{ backgroundImage: `url(${instrumentsMap[item].icon}})` }}></InstrumentIcon> */}

          <InstrumentName>
            {instrumentsMap[item].name.split(/(\n)/).map((item) => (item === '\n' ? <br /> : item))}
          </InstrumentName>
        </InstrumentButton>
      ))}
    </Wrapper>
  );
};
