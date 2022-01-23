import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { MediaContextProvider } from './contexts/MediaContext';
import { InstrumentsContextProvider } from './contexts/InstrumentsContext';
import { PitchContextProvider } from './contexts/PitchContext';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <InstrumentsContextProvider>
      <MediaContextProvider>
        <PitchContextProvider>
          <App />
        </PitchContextProvider>
      </MediaContextProvider>
    </InstrumentsContextProvider>,
    root
  );
}
