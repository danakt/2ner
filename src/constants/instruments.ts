// prettier-ignore
import {
  A1, Bb2, Cd2, A2, A3, A4, B0, B3, C2, C3, C4, D2, D3, D4, E1, E2, E3, E4,
  F3, F4, G2, G3, G4, Gd3, Cd3, Bb4, Bb0, Eb1, Gd1, Fd2, A0, D1, G1, F2, C1, Fd3, Bb1, Eb3
} from './noteFreq';

export const guitar: IInstrument = {
  name: 'Гитара',
  tunings: [
    {
      name: 'Standard',
      pitchList: [E2, A2, D3, G3, B3, E4],
      group: 'Popular',
    },
    {
      name: 'Drop D',
      pitchList: [D2, A2, D3, G3, B3, E4],
      group: 'Popular',
    },
    {
      name: 'A to a (Baritone)',
      pitchList: [A2, D3, G3, C4, E4, A4],
      group: 'Popular',
    },
    {
      name: 'All fourths',
      pitchList: [E2, A2, D3, G3, C4, F4],
      group: 'Popular',
    },
    {
      name: 'New standard tuning (all fifths)',
      pitchList: [C2, G2, D3, G3, C4, F4],
      group: 'Popular',
    },
    {
      name: 'Bb tuning',
      pitchList: [Bb2, Cd2, Gd3, Cd3, F4, Bb4],
      group: 'Popular',
    },
    {
      name: 'Drop C',
      pitchList: [C2, G2, C3, F3, A3, D4],
      group: 'Popular',
    },
    {
      name: 'Open C',
      pitchList: [C2, G2, C3, G3, C4, E4],
      group: 'Popular',
    },
    // {
    //   name: 'Drop A',
    //   pitchList: [A1, E2, A2, D3, Fd3, B3],
    //   group: 'Drop',
    // },
    // {
    //   name: 'Drop A#',
    //   pitchList: [Bb1, F2, Bb2, Eb3, G3, C4],
    //   group: 'Drop',
    // },
  ],
};

export const ukulele: IInstrument = {
  name: 'Укулеле',
  tunings: [
    {
      name: 'Tenor',
      pitchList: [G4, C4, E4, A4],
    },
    {
      name: 'Soprano',
      pitchList: [D3, G3, B3, E4],
    },
  ],
};

export const bassGuitar4: IInstrument = {
  name: 'Бас-гитара',
  // name: 'Бас-гитара\n(4 струны)',
  tunings: [
    {
      name: 'Standard',
      pitchList: [E1, A1, D2, G2],
    },
    {
      name: 'Drop D',
      pitchList: [D1, A1, D2, G2],
    },
    {
      name: 'E flat',
      pitchList: [Eb1, Gd1, Cd2, Fd2],
    },
    {
      name: 'Drop C',
      pitchList: [C1, G1, C2, F2],
    },
    {
      name: 'Low C',
      pitchList: [C1, A1, D2, G2],
    },
    {
      name: 'Low B',
      pitchList: [B0, E1, A1, D2],
    },
  ],
};

// export const bassGuitar5: IInstrument = {
//   name: 'Бас-гитара\n(5 струн)',
//   icon: iconBass,
//   tunings: [
//     {
//       name: 'Standard',
//       pitchList: [B0, E1, A1, D2, G2],
//     },
//     {
//       name: 'Low Bb',
//       pitchList: [Bb0, Eb1, Gd1, Cd2, Fd2],
//     },
//     {
//       name: 'Low A',
//       pitchList: [A0, D1, G1, C2, F2],
//     },
//     {
//       name: 'High C',
//       pitchList: [E1, A1, D2, G2, C3],
//     },
//   ],
// };

// export const guitar12: IInstrument = {
//   name: 'Гитара (12 струн)',
//   tunings: [
//     {
//       name: 'Standard',
//       pitchList: [E3, E2, A3, A2, D4, D3, G4, G3, B3, B3, E4, E4],
//     },
//   ],
// };
