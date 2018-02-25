import { observable, action, computed } from 'mobx'
import * as instruments from '../constants/instruments'

type Instrument = typeof instruments

export class StoreInstruments {
  /** Instruments */
  @observable public instruments = instruments

  /**
   * Current preset
   * Default: 'guitar'
   */
  @observable public currentInstrumentName: keyof Instrument = 'guitar'

  /** Current tuning */
  @observable public currentTuningIndex: number = 0

  /**
   * Cureent instrument
   */
  @computed
  get currentTuning() {
    const instrument = instruments[this.currentInstrumentName]
    return instrument.tunings[this.currentTuningIndex]
  }

  /**
   * Changes the instument
   * @param {string} newInstrumentName Instrument name
   * @param {number} newTuningIndex Tuning index
   */
  @action
  changeInstrument(
    newInstrumentName: keyof Instrument,
    newTuningIndex: number
  ): void {
    // If instrument name is not valid
    const instrument = instruments[newInstrumentName]
    if (!instrument) {
      return
    }

    this.changeTuning(newTuningIndex)
  }

  /***
   * Changes the tuning
   * @param {number} newTuningIndex Index of the tuning
   */
  @action
  changeTuning(newTuningIndex: number): void {
    const instrument = instruments[this.currentInstrumentName]

    // If tuning index is not valid for the instrument
    this.currentTuningIndex
      = instrument.tunings[newTuningIndex] !== undefined ? newTuningIndex : 0
  }
}

export const storeInstruments = new StoreInstruments()
