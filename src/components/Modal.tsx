import * as React from 'react';
import styled from 'styled-components';

interface TWrapperProps {
  showed?: boolean;
}

export const Wrapper = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  visibility: ${(props: TWrapperProps) => (props.showed ? 'visible' : 'hidden')};
  opacity: ${(props: TWrapperProps) => (props.showed ? 1 : 0)};
  transition: 0.5s ease-out;
  transition-property: opacity, visibility;
`;

export const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

type TProps = {
  isShown: boolean;
};

/**
 * Modal window component
 */
export class Modal extends React.Component<TProps> {
  public render(): JSX.Element {
    const { isShown: showed } = this.props;

    return (
      <Wrapper showed={showed}>
        <Content>{this.props.children}</Content>
      </Wrapper>
    );
  }
}
