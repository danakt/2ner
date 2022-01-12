import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../contexts/MediaContext';
import { getNoteNameFromPitch } from '../libs/notes';

const Wrapper = styled.div`
  height: 200px;
  margin: 0 auto;
`;

const IndicatorBox = styled.div`
  width: 400px;
  height: 200px;
  position: absolute;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 200%;
    background: #efefef;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 14px solid #0005;
  }
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  /* background: #000; */
  margin: 0 auto;
  transform-origin: 50% 100%;
  transition: transform 0.15s ease-out;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 200px solid #000;
`;

export const Indicator = () => {
  const { pitchIndicator } = useContext(MediaContext);

  const deg = pitchIndicator * 90;

  return (
    <>
      <Wrapper>
        <IndicatorBox>
          <Arrow
            style={{
              transform: `rotate(${deg}deg)`,
            }}
          />
        </IndicatorBox>
      </Wrapper>
    </>
  );
};
