import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './views/App'
import { stores } from './stores'

const root = document.getElementById('root')

if (root) {
  ReactDOM.render(<App {...stores} />, root)
}
