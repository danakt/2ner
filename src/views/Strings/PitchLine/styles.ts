import styled from 'styled-components'

type TLineProps = { y: number } // From 0 to 1

export const Line = styled.div`
  position: absolute;
  left: 0;
  top: ${(props: TLineProps) => props.y + '%'};
  height: 1px;
  width: 100%;
  background-color: blue;
`
