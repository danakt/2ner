import styled from 'styled-components'

type TLineProps = {
  y: number
  isHidden: boolean
}

export const Line = styled.div.attrs<TLineProps>({
  style: (props: TLineProps) => ({
    top:                props.y + '%',
    opacity:            props.isHidden ? 0 : 1,
    transitionDuration: (props.isHidden ? 1.5 : 0.1) + 's'
  })
})`
  position: absolute;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: blue;
  transition: ease-out;
  transition-property: top, opacity;
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
export const VisualizationWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  transform: translateY(-50%);
  opacity: 0.5;
`
