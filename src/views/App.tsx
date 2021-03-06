import * as React from 'react'
import { observer } from 'mobx-react'
import { Strings } from './Strings'
import { AudioRequestModal } from './AudioRequestModal'
import { Stores } from '~/stores'

type TProps = Stores

/** Main app component */
@observer
export class App extends React.Component<TProps> {
  public componentDidMount() {
    this.requestAudio()
  }

  /**
   * Requests audio stream
   */
  public requestAudio() {
    // Getting media stream
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.props.storeMedia.setAudioStream(stream)
      })
      .catch(err => {
        if (err) {
          // TODO make error handle
        }

        this.props.storeMedia.setAudioStream(null)
      })
  }

  public render() {
    const { audioStream } = this.props.storeMedia
    const isAudioRequestSent = audioStream !== undefined
    const isSetAudioStream: boolean = !!audioStream

    return (
      <React.Fragment>
        <Strings
          storeInstruments={this.props.storeInstruments}
          storeMedia={this.props.storeMedia}
        />

        <AudioRequestModal showed={isAudioRequestSent && !isSetAudioStream} />
      </React.Fragment>
    )
  }
}
