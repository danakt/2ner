import * as React from 'react'
import { Polyline, Svg } from './styles'

type TProps = {
  buffer: Float32Array | void
}

type TState = {
  windowWidth: number
  points: number[][]
  prevPoints: number[][]
  pointsNum: number
  visualizationHeight: number
}

/**
 * Number of visualization corners
 */
const POINTS_NUM = 128

export class Visualization extends React.Component<TProps, TState> {
  /** */
  private static prepareBuffer(
    buffer: Float32Array | void,
    pointsNum: number,
    height: number
  ): number[][] {
    // Minus height of the line * 2
    const fixedHeight: number = height - 2

    if (buffer == null) {
      return new Array(pointsNum).fill(0)
    }

    const offset: number = Math.abs(Math.min.apply(Math, buffer))

    const step = (buffer.length / pointsNum) | 0
    const pointsArray: number[][] = []

    for (let i = 0; i < pointsNum * step; i += step) {
      const x = i
      const y = Math.min((buffer[i] + offset) * fixedHeight, fixedHeight)

      pointsArray.push([x, y])
    }

    return pointsArray
  }

  /**
   * Component state
   */
  public state = {
    windowWidth:         window.innerWidth,
    pointsNum:           POINTS_NUM,
    points:              new Array(POINTS_NUM),
    prevPoints:          new Array(POINTS_NUM),
    visualizationHeight: 100
  }

  public componentDidMount() {
    window.addEventListener('resize', this.updateWindowWidth)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }

  public componentWillReceiveProps(nextProps: TProps) {
    if (nextProps.buffer) {
      this.setState({
        prevPoints: this.state.points,
        points:     Visualization.prepareBuffer(
          nextProps.buffer,
          this.state.pointsNum,
          this.state.visualizationHeight
        )
      })
    }
  }

  /**
   * Updates window width in state
   */
  public updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  public render() {
    const { visualizationHeight, windowWidth, points, prevPoints } = this.state

    const maxPoint: number
      = Math.max.apply(Math, points.map(item => item[1])) || 0
    const polylineTranslateY: number = (visualizationHeight - maxPoint) / 2

    return (
      <Svg viewBox={`0 0 ${windowWidth} ${visualizationHeight}`}>
        <Polyline transform={`translate(0, ${polylineTranslateY})`}>
          <animate
            attributeName="points"
            dur="0.05s"
            repeatCount="indefinite"
            from={prevPoints.toString()}
            to={points.toString()}
          />
        </Polyline>
      </Svg>
    )
  }
}
