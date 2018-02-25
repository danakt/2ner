import { observable, action } from 'mobx'
import { startAudioProcessing } from '~/libs/audio'
import { throttle } from '~/utils/throttle'

export class StoreMedia {
  /** Variable for saving function to cancel pitch update */
  private _stopAudioProcessing: void | VoidFunction = undefined

  /** Current audio pitch */
  @observable public currentPitch = 0

  /** Audio stream */
  @observable public audioStream: MediaStream | null | void = undefined

  /**
   * Sets audio stream
   * @param {MediaStream} stream
   */
  @action
  public async setAudioStream(stream: MediaStream | void | null) {
    this.audioStream = stream

    // Stop previous audio processing
    if (typeof this._stopAudioProcessing === 'function') {
      this._stopAudioProcessing()
    }

    // Set new pitch updating
    if (stream != null) {
      const throttledPitchUpdate = throttle(30, pitch =>
        this.updatePitch(pitch)
      )

      this._stopAudioProcessing = await startAudioProcessing(
        stream as MediaStream,
        pitch => throttledPitchUpdate(pitch)
      )
    }
  }

  /**
   * Updates the pitch
   * @param pitch The pitch
   */
  @action
  public updatePitch(pitch: number) {
    this.currentPitch = pitch
  }
}

export const storeMedia = new StoreMedia()
