import {keyframes} from 'styled-components';
import styled from 'styled-components';
import React from 'react';

const LoaderFadeIn = keyframes`
  0%   { opacity:0;   }
  100% { opacity:1.0; }
`
const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(252,252,252,.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  animation: ${LoaderFadeIn} 500ms ease 1;
`

const LoaderPulse = keyframes`
0%{
  opacity:0.5;
  transform:scale(0.95);
}
50%{
  opacity:1;
  transform:scale(1);
}
100% {
  opacity:0.5;
  transform:scale(0.95);
}
`

const LoaderText = styled.div`
  color: #4A90E2;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  animation: ${LoaderPulse} 2000ms ease infinite;
`

const DotPulse = keyframes`
  0%  { opacity: 0;   }
  36% { opacity: 1.0; }
  75% { opacity: 0;   }
  100%{ opacity: 0;   }
`

const LoaderDot = styled.div`
  display: inline-block;
  border-radius: 100%;
  width: 8px;
  height: 8px;
  margin-left: 8px;
  animation: ${DotPulse} 2000ms ${props => props.delay} ease-in-out infinite;
  background-color: #4A90E2;
  opacity: 0;
`

const LoaderDots = () => (
  <React.Fragment>
    <LoaderDot delay='0ms' />
    <LoaderDot delay='500ms' />
    <LoaderDot delay='1000ms' />
  </React.Fragment>
)

const CardLoader = () => (
  <LoaderWrapper>
    <LoaderText>Calculating Network Pricing <LoaderDots/></LoaderText>
  </LoaderWrapper>
);

export default CardLoader;
