import * as React from 'react'

type TProps = {
  currentBuffer: Float32Array
}

type TState = {
  windowWidth: number
}

export class Visualization extends React.Component<TProps, TState> {
  public state = {
    windowWidth: window.innerWidth
  }

  public componentDidMount() {
    window.addEventListener('resize', this.updateWindowWidth)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }

  /**
   * Updates window width in state
   */
  public updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  public render() {
    return (
      <svg
        x="0px"
        y="0px"
        viewBox={`0 0 ${this.state.windowWidth} 100`}
        preserveAspectRatio="none"
      >
        <polyline />
      </svg>
    )
  }
}
