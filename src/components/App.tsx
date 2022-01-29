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
import { AudioRequestMessage } from './AudioRequestMessage';

const Wrapper = styled.div`
  height: 100%;
  min-height: 600px;
  max-width: 1460px;
  margin: 0 auto;
  padding: 0 30px;
  overflow: hidden;

  @media (min-width: 590px) {
    min-height: 900px;
  }
`;

const Body = styled.div`
  padding-top: 30px;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
  position: relative;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

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
  const { audioStream, isLoading } = useContext(MediaContext);

  return (
    <Wrapper>
      <GlobalStyles />

      <Body>
        <ContentWrapper>
          <Content>
            <Breadcrumbs>
              <a href="https://danakt.com" className="always-fresh">
                Данакт
              </a>{' '}
              / 2ner
            </Breadcrumbs>

            {!isLoading && !!audioStream ? (
              <>
                <InstrumentSelect />
                <TuningSelect />
                <Note />
                <Indicator />
                <AutoSelectToggle />
                <Strings />
              </>
            ) : (
              <AudioRequestMessage />
            )}
          </Content>
        </ContentWrapper>
      </Body>
    </Wrapper>
  );
};
