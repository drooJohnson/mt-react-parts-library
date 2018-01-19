import React from 'react';

import styled from 'styled-components';

import Select from '../components/select';
import Button from '../components/buttons';

import { connect } from 'react-redux';

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
      console.log("DISPATCHING");
      dispatch({type: 'SHOW_SCRIM',scrim:{
        color:'dark',
        opacity:0.5,
        zIndex:'high'
      }});
//      dispatch({type: 'SHOW_MODAL'})
    },
  })
)(ButtonScaffold);

const Testing = () => (
  <Div>
    <ModalScrimButton/>
    <Select/>
    <p>{this}</p>
  </Div>
)

export default Testing;
