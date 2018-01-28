import React from 'react';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAlignJustify from '@fortawesome/fontawesome-free-solid/faAlignJustify';
import faThLarge from '@fortawesome/fontawesome-free-solid/faThLarge';

import { compose } from 'redux';
import { connect } from 'react-redux';

const SwitchWrapper = styled.div`
  width:auto;
  height:auto;
`

class ListGridSwitch extends React.Component {
  componentWillMount(){
    this.IconStyle = {
      color: this.props.active ? '#4eeeb9' : '#CCCCCC',
    }
  }
  render(){
    return(
      <SwitchWrapper active={this.props.active}>
        <FontAwesomeIcon onClick={this.props.onListClick} icon={faAlignJustify} style={{fontSize:24, color: this.props.active === 'list' ? '#4eeeb9' : '#CCCCCC',}}/>
        <FontAwesomeIcon onClick={this.props.onGridClick} icon={faThLarge} style={{fontSize:24,marginLeft:12, color: this.props.active === 'grid' ? '#4eeeb9' : '#CCCCCC',}}/>
      </SwitchWrapper>
    )
  }
}

export default compose(
  connect(
    null,
    (dispatch) => ({
      onListClick: () => {
        dispatch({type:'TO_LIST'});
      },
      onGridClick: () => {
        dispatch({type:'TO_GRID'});
      }

    })
  )/*
  connect(
    (state)=> ({
      collections:state.firestore.ordered.collections,
      parts:state.firestore.ordered.parts,
      store:state.store
    }),
    (dispatch) => ({
      onClick:(collection) => {
        dispatch({type:'CHANGE_SELECTED_COLLECTION', collection})
      }
    })
  )*/
)(ListGridSwitch)
