import * as React from 'react'
import { Line } from './styles'

type TProps = {
  pitchList: number[]
  pitch: number
}

type TState = {
  isHidden: boolean
  y: number
  pitch: number
  extendedPitchList: number[]
}

export class PitchLine extends React.Component<TProps, TState> {
  public state = {
    isHidden:          true,
    y:                 0,
    pitch:             0,
    extendedPitchList: PitchLine.extendPitchList(this.props.pitchList)
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
    const { pitchList } = this.props

    // Add new points to start and end of list
    this.setState({
      extendedPitchList: PitchLine.extendPitchList(pitchList)
    })
  }

  /** Render */
  public render() {
    const { pitch } = this.props
    const { extendedPitchList } = this.state

    return <Line y={PitchLine.getLinePosition(pitch, extendedPitchList)} />
  }
}
