import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../contexts/MediaContext';

const Wrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const AudioRequestMessage = () => {
  const { requestAudio } = useContext(MediaContext);

  return (
    <Wrapper>
      <div>
        <span>Для использования тюнера требуется </span>
        <br />
        <a
          href="#"
          className="always-fresh"
          onClick={(event) => {
            requestAudio();
            event.preventDefault();
          }}
        >
          включить микрофон
        </a>
      </div>
    </Wrapper>
  );
};
