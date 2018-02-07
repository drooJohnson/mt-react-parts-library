import styled from 'styled-components';

const PartImage = styled.div`
  background-image: url(${props => props.image});
  background-color: #ffffff;
  background-size: contain;
  background-position: center center;
  height:300px;
  width:100%;
  position:relative;
`

const PartImageWithShadow = PartImage.extend`
  background-image: none;
  background-color: #ffffff;
  background-size: contain;
  background-position: center center;
  :after{
    content:'';
    display:block;
    position:absolute;
    top:0;bottom:0;right:0;left:0;
    background-image: url(${props => props.image});
    background-size: contain;
    background-position: center center;
    filter:drop-shadow(0 4px 4px rgba(0,0,0,0.25));
  }
`

export {PartImage,PartImageWithShadow};
