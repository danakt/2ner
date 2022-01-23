import React, { useContext } from 'react';
import styled from 'styled-components';
import { Strings } from './Strings';
import { MediaContext } from '../contexts/MediaContext';
import { GlobalStyles } from './GlobalStyles';
import { Indicator } from './Indicator';
import { InstrumentSelect } from './InstrumentSelect';
import { TuningSelect } from './TuningSelect';
import { Note } from './Note';
import { AutoSelectToggle } from './AutoselectToggle';

const Wrapper = styled.div`
  /* overflow: hidden; */
`;

const Body = styled.div`
  padding-top: 30px;
`;

const ContentWrapper = styled.div`
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
  const { requestAudio, audioStream } = useContext(MediaContext);

  return (
    <Wrapper>
      <GlobalStyles />

      <Body>
        <Breadcrumbs>
          <a href="https://danakt.com" className="always-fresh">
            Данакт
          </a>{' '}
          / 2ner
        </Breadcrumbs>

        <ContentWrapper>
          <Content>
            {!!audioStream ? (
              <>
                <InstrumentSelect />
                <TuningSelect />
                <Note />
                <Indicator />
                <AutoSelectToggle />
                <Strings />
              </>
            ) : (
              <div>
                <span>Для использования тюнера требуется</span>{' '}
                <a href="#" onClick={requestAudio}>
                  включить микрофон
                </a>
              </div>
            )}
          </Content>
        </ContentWrapper>
      </Body>
    </Wrapper>
  );
};
