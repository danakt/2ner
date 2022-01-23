import React, { useContext } from 'react';
import styled from 'styled-components';
import { PitchContext } from '../contexts/PitchContext';
import { getNoteNameFromPitch } from '../libs/notes';

const Wrapper = styled.div`
  position: relative;
  padding: 20px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(90, 166, 231, 0.2) 0%, rgba(90, 166, 231, 0) 70%);
  }

  @media (min-width: 590px) {
    padding: 70px 0;
  }
`;

const NoteWrapper = styled.div`
  font-size: 40px;

  @media (min-width: 590px) {
    font-size: 80px;
  }
`;

const PitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DisplayedPitch = styled.div`
  width: 80px;
  text-align: center;
`;

const DesiredPitch = styled.div`
  width: 80px;
  text-align: center;
  opacity: 0.5;
`;

export const Note = () => {
  const { displayedPitch, desiredPitch } = useContext(PitchContext);

  return (
    <Wrapper>
      <NoteWrapper className="sans-serif">{getNoteNameFromPitch(displayedPitch)}</NoteWrapper>

      <PitchWrapper>
        <DisplayedPitch>{displayedPitch.toFixed(1)} Hz</DisplayedPitch>
        <DesiredPitch>{desiredPitch.toFixed(1)} Hz</DesiredPitch>
      </PitchWrapper>
    </Wrapper>
  );
};
