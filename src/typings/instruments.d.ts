/** Tuning type */
declare interface ITuning {
  name: string
  pitchList: number[]
}

/** Preset type */
declare interface IIntrument {
  name: string
  tunings: ITuning[]
}
