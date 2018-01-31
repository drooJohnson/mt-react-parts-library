import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../components/buttons';
import Spinner from '../../components/loaders/spinner';

const PartPreview = styled.div`
  width: 100%;
  height: 204px;
  background-color: #fafafa;
  border-bottom: 1px solid #ededed;
  filter:${props => props.hover ? 'contrast(1.0) brightness(1.0)' : 'contrast(0.5) brightness(1.3)'};
  position: relative;
  transition: filter 300ms ease;
`

const PartPreviewImage = styled.img`
  opacity: ${props => props.imageLoading ? '0.0' : '1.0' };
  display: block;
  height: 100%;
  width: 100%;
  object-fit: contain;
  transition: opacity 300ms ease;
`

const ImageOverlay = styled.div`
  display: flex;
  opacity: 0.0;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 300ms ease;
  &:hover,&:focus{
    opacity: 1.0;
  }
`

const ImageOverlaySelectionButton = styled.div`
  width: 22px;
  height: 22px;
  background-color: transparent;
  position: absolute;
  top: 16px;
  left: 16px;
  border: 1px solid #ffffff;
  border-radius: 100%;
  cursor: pointer;
  transition: background-color 150ms ease;
  &:hover{
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const OverlayLink = styled(Link)`
  text-decoration: none;
`

const ImageOverlayDetailsButton = ({ id, children }) => (
  <OverlayLink to={`/parts/${id}`}><Button type="success" size="small" style={{fontSize: '12px'}}>{children}</Button></OverlayLink>
)

class GridPartPreviewContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageLoading: true,
    }
  }

  imageLoaded = () => {
    this.setState({ imageLoading: false });
  }

  render(){
    let { hover, image, hoverOverlayEnabled, part } = this.props;
    return(
      <PartPreview hover={hover}>
        { this.state.imageLoading && <Spinner/> }
        <PartPreviewImage src={image} onLoad={this.imageLoaded} imageLoading={this.state.imageLoading}/>
        { hoverOverlayEnabled &&
            <ImageOverlay hover={hover}>
              <ImageOverlayDetailsButton id={part.id}>Edit Part</ImageOverlayDetailsButton>
              <ImageOverlaySelectionButton/>
            </ImageOverlay>
        }
      </PartPreview>
    )
  }
}

GridPartPreviewContainer.propTypes = {
  hover: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  hoverOverlayEnabled: PropTypes.bool,
  part: PropTypes.object.isRequired,
}

export default GridPartPreviewContainer;
