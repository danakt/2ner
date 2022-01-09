import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Strings } from './Strings';
import { MediaContext } from '../contexts/MediaContext';
import { Modal } from './Modal';
import { GlobalStyles } from './GlobalStyles';
import { Indicator } from './Indicator';

const Body = styled.div`
  padding: 30px 0 100px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
  position: relative;
  margin: 0 auto;

  @media (max-width: 1310px) {
    width: 62.5%;
  }

  @media (max-width: 1150px) {
    width: 75%;
  }

  @media (max-width: 980px) {
    width: 100%;
  }
`;

const Breadcrumbs = styled.strong`
  display: block;
  font-size: 17px;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 1.2em;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  font-size: 1.2em;
`;

export const App = () => {
  const [isStarted, setStared] = useState(false);

  const { setAudioStream } = useContext(MediaContext);

  const requestAudio = () => {
    // Getting media stream
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setAudioStream(stream);
        setStared(true);
      })
      .catch((err) => {
        if (err) {
          // TODO make error handle
        }

        setAudioStream(null);
      });
  };

  return (
    <>
      <GlobalStyles />

      <Body>
        <Breadcrumbs>
          <a href="https://danakt.com" className="always-fresh">
            Данакт
          </a>{' '}
          / 2ner
        </Breadcrumbs>

        <Wrapper>
          <Content>
            {isStarted ? (
              <>
                <Indicator />
                <Strings />
              </>
            ) : (
              <Center>
                <br />
                <br />
                Для использования тюнера требуется включить микрофон
                <br />
                <br />
                <Button onClick={requestAudio}>Включить</Button>
              </Center>
            )}
          </Content>
        </Wrapper>
      </Body>
    </>
  );
};
