import * as React from 'react'
import { Wrapper, Content } from './styles'

type TProps = {
  showed: boolean
}

/**
 * Modal window component
 */
export class Modal extends React.Component<TProps> {
  public render(): JSX.Element {
    const { showed } = this.props

    return (
      <Wrapper showed={showed}>
        <Content>{this.props.children}</Content>
      </Wrapper>
    )
  }
}
