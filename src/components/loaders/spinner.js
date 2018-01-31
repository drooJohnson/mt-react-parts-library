import styled from 'styled-components';
import { keyframes } from 'styled-components';

const LoadingSpinnerAnimation = keyframes`
  0%{
    transform:rotateZ(0deg);
  }
  100%{
    transform:rotateZ(360deg);
  }
`

const LoadingSpinner = styled.div`
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  display:flex;
  justify-content:center;
  align-items:center;
  &:after{
    content:"";
    position:relative;
    width:24px;
    height:24px;
    min-width:24px;
    min-height:24px;
    border:4px solid transparent;
    border-top-color: #00e7b2;
    border-left-color: #00e7b2;
    border-radius:100%;
    animation:${LoadingSpinnerAnimation} 1000ms linear infinite;
  }
`

export default LoadingSpinner;
