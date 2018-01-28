import React from 'react';

import styled from 'styled-components';

import Button from '../components/buttons';

import { connect } from 'react-redux';

import { TESTING_MODAL } from '../constants/ModalTypes';

const Div = styled.div`
  width:100%;
  height:100%;
`

class ButtonScaffold extends React.Component {
  render(){
    return(
      <Button nature="primary" onClick={()=>{this.props.onClick()}}>SUMMON MODAL</Button>
    )
  }
}

const ModalScrimButton = connect(
  null,
  (dispatch) => ({
    onClick: () => {
      dispatch({type: 'SHOW_SCRIM', scrim:{
        color:'dark',
        opacity:0.5,
        zIndex:'high'
      }})
      dispatch({type: 'SHOW_MODAL', modalType: TESTING_MODAL });
    }
  })
)(ButtonScaffold);

const Testing = () => (
  <Div>
    <ModalScrimButton/>
    <p>{this}</p>
  </Div>
)

export default Testing;
