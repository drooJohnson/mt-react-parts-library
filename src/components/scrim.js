import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import zIndex from '../utils/z-index';
import {connect} from 'react-redux';

const colors = {
  dark:'#000000',
  light:'#FFFFFF'
}

// BY DEFAULT, THE SCRIM WILL BE BLACK, 50% OPACITY

const ScrimBackdrop = styled.div`
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  transition: opacity 300ms ease;
  z-index: ${props => props.zIndex ? zIndex[props.zIndex] : zIndex.scrimHigh };
  background-color: ${props => props.color ? colors[props.color.toLowerCase()] : '#FFFFFF'};
  opacity: ${props => props.opacity ? props.opacity : 0};
  display: ${props => props.display === 'true' ? 'block' : 'none'};
`

class Scrim extends React.Component {
  constructor(props){
    super(props);
    console.log(this);
  }
  render(){
    console.log(this);
    return (
      <ScrimBackdrop {... this.props} onClick={()=>{this.props.onClick()}} display={this.props.display.toString()}/>
    )
  }
}

Scrim.propTypes = {
  color: PropTypes.oneOf(['Dark','Light','dark','light']),
  opacity: PropTypes.number,
  display: PropTypes.string,
  zIndex: PropTypes.oneOf(['Low','High','low','high'])
}

export default connect(
  (state, props) =>
    ({
      zIndex: state.store.scrim.zIndex,
      color: state.store.scrim.color,
      opacity: state.store.scrim.opacity,
      display: state.store.scrim.display,
      store: state.store
    }),
    (dispatch) => ({
      onClick: () => {
        dispatch({type: 'HIDE_SCRIM'});
  //      dispatch({type: 'SHOW_MODAL'})
      },
    })
  )(Scrim);
