/** Tuning type */
declare interface ITuning {
  name: string
  pitchList: number[]
}

/** Preset type */
declare interface IInstrument {
  name: string
  tunings: ITuning[]
}
