/** Tuning type */
declare interface ITuning {
  name: string
  pitchList: number[]
}

/** Instrument type */
declare interface IInstrument {
  name: string
  tunings: ITuning[]
}
