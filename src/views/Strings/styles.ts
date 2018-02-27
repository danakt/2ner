import styled from 'styled-components'

export const StringsWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;
  height: calc(100% - 200px);
  width: 100%;
`

type TString = { size: number }

export const String = styled.div`
  width: 100%;
  background: #ebebeb;
  position: relative;
  height: ${(props: TString) => props.size}px;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    height: ${(props: TString) => props.size}px;
    width: ${(props: TString) => props.size}px;
    margin-left: -${(props: TString) => props.size / 2}px;
    background-color: #333;
    /* border-radius: 50%; */
  }
`

export const StringInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -28px;
  margin-left: 50px;
  color: #999;
  font-size: 16px;
`
