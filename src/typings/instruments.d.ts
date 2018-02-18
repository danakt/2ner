/** Tuning type */
declare interface ITuning {
  name: string
  pitch: number[]
}

/** Preset type */
declare interface IIntrument {
  name: string
  tunings: ITuning[]
}
