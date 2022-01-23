import React, { useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { PitchContext } from '../contexts/PitchContext';

const Wrapper = styled.div`
  cursor: pointer;
  width: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ToggleWrapper = styled.div`
  width: 70px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  transition: 0.1s ease-out;
  transition-property: border-color, background-color;
  margin-bottom: 5px;

  &.enabled {
    border-color: #5aa6e7;
    background-color: #5aa6e7;
  }
`;

const ToggleCircle = styled.div`
  width: 32px;
  height: 32px;
  background: #fff;
  margin: 3px;
  border-radius: 50%;
  transition: 0.1s ease-out;
  transition-property: transform;

  ${ToggleWrapper}.enabled & {
    transform: translateX(30px);
  }
`;

const Label = styled.div``;

export const AutoSelectToggle = () => {
  const { setAutoSelectEnabled, isAutoSelectEnabled } = useContext(PitchContext);

  const toggle = () => setAutoSelectEnabled(!isAutoSelectEnabled);

  return (
    <Wrapper onClick={toggle}>
      <ToggleWrapper className={classNames({ enabled: isAutoSelectEnabled })}>
        <ToggleCircle />
      </ToggleWrapper>
      <Label>Авто</Label>
    </Wrapper>
  );
};
