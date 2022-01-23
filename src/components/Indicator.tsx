import React, { useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import indicatorBg from '../icons/indicator.png';
import { PitchContext } from '../contexts/PitchContext';

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0 auto;
`;

const IndicatorBox = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
`;

const Circle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url(${indicatorBg}) 50% 0 no-repeat;
  background-size: 100% auto;

  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.33);
    border-radius: 50%;
  }

  &.correct::after {
    background: rgb(200, 255, 200);
    box-shadow: 0 0 10px 5px rgba(0, 255, 13, 0.33);
  }
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  margin: 30px auto 0;
  transform-origin: 50% 100%;
  transition: transform 0.15s ease-out;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 100px solid #fff;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 94px;
    width: 12px;
    height: 12px;
    background: #fff;
    transform: translateX(-50%);
    border-radius: 50%;
  }
`;

export const Indicator = () => {
  const { pitchIndicator, isStringCorrect } = useContext(PitchContext);

  const deg = pitchIndicator * 90;

  return (
    <>
      <Wrapper>
        <IndicatorBox>
          <Circle className={classNames({ correct: isStringCorrect })} />

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
