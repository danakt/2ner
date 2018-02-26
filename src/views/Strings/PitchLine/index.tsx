import * as React from 'react'
import { Line, LineInfo, VisualizationWrapper } from './styles'

type TProps = {
  pitchList: number[]
  pitch: number
}

type TState = {
  y: number
  pitch: number
  extPitchList: number[]
  isHidden: boolean
}

export class PitchLine extends React.Component<TProps, TState> {
  public state = {
    y:            0,
    isHidden:     true,
    pitch:        0,
    extPitchList: PitchLine.extendPitchList(this.props.pitchList)
  }

  /**
   * Adds new points to start and end of list
   * @param pitchList The pitch list
   * @return Extended pitch list
   */
  private static extendPitchList(pitchList: number[]): number[] {
    return [
      pitchList[0] - (pitchList[1] - pitchList[0]),
      ...pitchList,
      pitchList[pitchList.length - 1]
        + (pitchList[pitchList.length - 1] - pitchList[pitchList.length - 2])
    ]
  }

  /** Returns line position */
  private static getLinePosition(pitch: number, pitchList: number[]): number {
    for (let i = 1; i < pitchList.length; i++) {
      if (pitch > pitchList[i]) {
        continue
      }

      const prev = pitchList[i - 1]
      const cur = pitchList[i]

      const mainPos = (i - 1) / (pitchList.length - 1)
      const localPos = (pitch - prev) / (cur - prev) / (pitchList.length - 1)

      return (mainPos + localPos) * 100
    }

    return -1
  }

  /** Component will receive props */
  public componentWillReceiveProps(nextProps: TProps) {
    const { pitchList, pitch } = nextProps

    // Add new points to start and end of list
    if (this.props.pitchList !== pitchList) {
      this.setState({
        extPitchList: PitchLine.extendPitchList(pitchList)
      })
    }

    // Validate pitch
    if (
      pitch < Math.max.apply(Math, this.state.extPitchList)
      && pitch > Math.min.apply(Math, this.state.extPitchList)
    ) {
      this.setState({
        pitch,
        isHidden: false
      })
    } else {
      this.setState({
        isHidden: true
      })
    }
  }

  /** Render */
  public render() {
    const { extPitchList, pitch } = this.state

    return (
      <Line
        isHidden={this.state.isHidden}
        y={PitchLine.getLinePosition(pitch, extPitchList)}
      >
        <LineInfo>{pitch.toFixed(2)} hz</LineInfo>
        <VisualizationWrapper>{this.props.children}</VisualizationWrapper>
      </Line>
    )
  }
}
