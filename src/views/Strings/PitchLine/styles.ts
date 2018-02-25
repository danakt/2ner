import styled from 'styled-components'

type TLineProps = {
  y: number
  isHidden: boolean
}

export const Line = styled.div.attrs<TLineProps>({
  style: (props: TLineProps) => ({
    top: props.y + '%'
  })
})`
  position: absolute;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: blue;
  opacity: ${(props: TLineProps) => (props.isHidden ? 0 : 1)};
  transition: top 0.1s ease-out, opacity 0.5s ease-out;
  transition-delay: ${(props: TLineProps) => (props.isHidden ? 0.75 : 0)}s;
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
