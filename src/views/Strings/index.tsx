import * as React from 'react'
import { getNoteNameFromPitch } from '~/libs/notes'
import { StoreInstruments } from '~/stores/instruments'
import { StringsWrapper, String, StringInfo } from './styles'
import { PitchLine } from './PitchLine'

type TProps = {
  storeInstruments: StoreInstruments
}

/** Strings wrapper */
export class Strings extends React.PureComponent<TProps> {
  public render() {
    const { pitchList } = this.props.storeInstruments.currentTuning

    return (
      <React.Fragment>
        <StringsWrapper>
          {pitchList.map((item, i) => (
            <String key={item} size={pitchList.length - (i * 0.7 + 1)}>
              <StringInfo>
                {getNoteNameFromPitch(item)} {item.toFixed(2)} hz
              </StringInfo>
            </String>
          ))}
        </StringsWrapper>

        <PitchLine pitch={380.41} pitchList={pitchList} />
      </React.Fragment>
    )
  }
}
