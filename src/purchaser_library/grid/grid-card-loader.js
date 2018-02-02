import {keyframes} from 'styled-components';
import styled from 'styled-components';
import React from 'react';
const LoaderFadeIn = keyframes`
  0%{opacity:0;}
  100%{opacity:1.0}
`
const LoaderWrapper = styled.div`
  position:absolute;
  top:0;right:0;bottom:0;left:0;
  background-color:rgba(252,252,252,.95);
  display:flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  animation:${LoaderFadeIn} 500ms ease 1;
`

const SpriteKeyframes = keyframes`
  0%   {background-position:0 0;}
  100% {background-position: -416px 0;}
`

const Animation = styled.div`
  position:absolute;
  top: 122px;
  width: 138px;
  height: 164px;
  background: url('../assets/loader_sprite.png') right center;
  background-size: cover;
  animation:${SpriteKeyframes} 1500ms steps(3) infinite;
`

const LoaderText = styled.div`
  position:absolute;
  top:235px;
  left:0;
  right:0;
  color:#4A90E2;
  font-size:14px;
  font-weight:600;
  text-align:center;
`

const CardLoader = () => (
  <LoaderWrapper>
    <Animation></Animation>
    <LoaderText>Calculating Network Pricing</LoaderText>
  </LoaderWrapper>
)

export default CardLoader;
