import { observable, action } from 'mobx'

export class StoreMedia {
  /** Audio stream */
  @observable public audioStream: MediaStream | null | void = undefined

  /**
   * Sets audio stream
   * @param {MediaStream} stream
   */
  @action
  public setAudioStream(stream: MediaStream | void | null): void {
    this.audioStream = stream
  }
}

export const storeMedia = new StoreMedia()
