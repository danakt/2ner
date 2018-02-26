import * as React from 'react'
import { observer } from 'mobx-react'
import { getNoteNameFromPitch } from '~/libs/notes'
import { StoreInstruments } from '~/stores/instruments'
import { StoreMedia } from '~/stores/media'
import { StringsWrapper, String, StringInfo } from './styles'
import { PitchLine } from './PitchLine'
import { Visualization } from './Visualization'

type TProps = {
  storeInstruments: StoreInstruments
  storeMedia: StoreMedia
}

/** Strings wrapper */
@observer
export class Strings extends React.Component<TProps> {
  public render() {
    const { pitchList } = this.props.storeInstruments.currentTuning
    const { currentPitch, currentBuffer } = this.props.storeMedia

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

          <PitchLine pitch={currentPitch} pitchList={pitchList}>
            <Visualization buffer={currentBuffer} />
          </PitchLine>
        </StringsWrapper>
      </React.Fragment>
    )
  }
}
