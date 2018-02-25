import styled from 'styled-components'

export const StringsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
`

type TString = { size: number }

export const String = styled.div`
  width: 100%;
  background: #ebebeb;
  position: relative;
  height: ${(props: TString) => props.size}px;
`

export const StringInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -24px;
  margin-left: 50px;
  color: #999;
  font-size: 16px;
`
