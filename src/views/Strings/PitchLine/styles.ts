import styled from 'styled-components'

type TLineProps = {
  y: number
  isHidden: boolean
}

export const Line = styled.div`
  position: absolute;
  left: 0;
  top: ${(props: TLineProps) => props.y + '%'};
  height: 1px;
  width: 100%;
  background-color: blue;
  opacity: ${(props: TLineProps) => (props.isHidden ? 0 : 1)};
  transition: top 0.15s ease-out, opacity 0.5s ease-out;
`

export const LineInfo = styled.div`
  position: absolute;
  right: 50%;
  top: 50%;
  margin-top: -24px;
  margin-right: 50px;
  color: #999;
  font-size: 16px;
  color: blue;
`
