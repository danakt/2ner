declare interface ITuning {
  name: string;
  pitchList: number[];
  group?: string;
}

declare interface IInstrument {
  name: string;
  icon?: string;
  tunings: ITuning[];
}
