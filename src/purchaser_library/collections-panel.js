import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

import styled from 'styled-components';
import Button from '../components/buttons.js';

const Wrapper = styled.div`
  border: 1px solid #cccccc;
  background: #ccc;
  display:grid;
  grid-template-rows:auto 1fr auto;
  grid-template-areas:"collections-header""collections-body""collections-footer";
  grid-area: ${props => props.gridarea};
  position:absolute;
  bottom:0;
  top:0;
  height:100%;
  width:100%;
`

const HeaderWrapper = styled.button`
  position:relative;
  background: ${props => props.active ? '#ffffff' : '#fafafa'};
  padding: 12px;
  color: #000;
  display: flex;
  border: none;
  border-left: ${props => props.active ? '8px solid #000000' : '0 solid #fafafa'};
  width: 100%;
  text-align: left;
  text-transform: uppercase;
  font-weight:bold;
  line-height:21px;
  align-self:end;
  grid-area:collections-header;
  cursor:pointer;
  &:focus{
    outline:none;
  }
`

const CollectionInner = styled.div`
  transition: all 300ms ease;
  position:relative;
  background: ${props => props.active ? '#ffffff' : '#fafafa'};
  padding: 12px;
  padding-top: 13px;
  color: #000;
  display: flex;
  border: none;
  border-left: ${props => props.active ? '8px solid #000000' : '0 solid #fafafa'};
  box-shadow:0 -1px 0 #cccccc;
  width: 100%;
  text-align: left;
  cursor:pointer;
`

const Name = styled.span`
  flex-grow:1;
`

const PartCount = styled.span`
  margin-left:auto;
`

class Collection extends React.Component {
  render(){
    return(
        <CollectionInner active={this.props.active} onClick={()=>{this.props.onClick(this.props.name)}}>
          <Name>{this.props.name}</Name>
          <PartCount>{this.props.partCount}</PartCount>
        </CollectionInner>
    )
  }
}

Collection.defaultProps = {
  active:false
}

class CollectionsHeader extends React.Component {
  render(){
    return (
      <HeaderWrapper>
        <span>COLLECTIONS</span>
        <span style={{marginLeft:'auto'}}><FontAwesomeIcon icon={faPlus}/></span>
      </HeaderWrapper>
    )
  }
}

const SyncWrapper = styled.div`
  padding:5px;
  background:#ffffff;
  grid-area:collections-footer;
`

const SyncButton = styled(Button)`
  width:100%;
  margin:0;
  justify-content:center;
`
class A360Area extends React.Component {
  render(){
    return (
      <SyncWrapper><SyncButton type="info" width="full">Sync With A360</SyncButton></SyncWrapper>
    )
  }
}

const CollectionsPanel = ({ collections, parts, gridarea, store, onAllPartsClick, onCollectionClick }) => (
  <Wrapper gridarea={gridarea}>
    <CollectionsHeader/>
    <div style={{gridArea:'collections-body'}}>
      <Collection name='All Parts' partCount={ parts ? parts.length : "..." } active={store.collection.Name === ''} onClick={()=>{onAllPartsClick()}}/>
      {
        collections ?
        collections.map((collection) => (
          <Collection key={collection.id} name={collection.Name} partCount={collection.Parts.length} active={store.collection === collection} onClick={()=>{onCollectionClick(collection)}}/>
        ))
        :
        <span>Loading</span>
      }
    </div>
    <A360Area/>
  </Wrapper>
)

CollectionsPanel.propTypes = {
  collections: PropTypes.array,
  parts: PropTypes.array,
  gridarea: PropTypes.string,
  store: PropTypes.object
};

export default compose(
  firestoreConnect(['collections','parts']),
  connect(
    (state,props) => ({collections:state.firestore.ordered.collections, parts:state.firestore.ordered.parts, store:state.store}),
    (dispatch) => ({
      onCollectionClick: (collection) => {
        dispatch({type:'CHANGE_SELECTED_COLLECTION', collection});
        console.log(collection);
      },
      onAllPartsClick: () => {
        dispatch({type:'CLEAR_SELECTED_COLLECTION'});
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
)(CollectionsPanel)
