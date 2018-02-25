import * as React from 'react'
import { Modal } from '~/components/Modal'

type TProps = {
  showed: boolean
  onMediaReceive?(stream: MediaStream): void
}

/**
 * Modal window for request to accessing of user's microphone
 */
export class AudioRequestModal extends React.PureComponent<TProps> {
  public async componentDidMount() {
    // Getting media stream
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    if (typeof this.props.onMediaReceive === 'function') {
      this.props.onMediaReceive(stream)
    }
  }

  public render() {
    return (
      <Modal showed={this.props.showed}>
        Для использования тюнера требуется включить микрофон
      </Modal>
    )
  }
}
