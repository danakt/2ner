import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { MediaContextProvider } from './contexts/MediaContext';
import { InstrumentsContextProvider } from './contexts/InstrumentsContext';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <InstrumentsContextProvider>
      <MediaContextProvider>
        <App />
      </MediaContextProvider>
    </InstrumentsContextProvider>,
    root
  );
}
