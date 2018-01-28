import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'

import styled from 'styled-components';

import PartsSelectionBar from './parts-selection-bar';
import PartGridCard from './part-grid-card';
import PartListCard from './part-list-card';

const CardGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:${props => props.libraryLayout === 'grid' ? '1fr 1fr 1fr' : '1fr'};
  grid-row-gap:8px;
  grid-column-gap:8px;
  grid-auto-flow:row;
  position:relative;
  overflow-y:scroll;
`

const PartsGridWrapper = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:stretch;
  align-items:start;
  grid-area:${props => props.gridarea};
`

const PartCards = (parts, priceDisplay, libraryLayout) => {
  switch(libraryLayout){
    case 'grid':
      return(
        <React.Fragment>
          {
            parts ? parts.map((part) => (
              <PartGridCard key={part.id} part={part} image={`../assets/${part.assets.thumbnail}`} priceDisplay={priceDisplay}/>
            )) : <span>Loading...</span>
          }
        </React.Fragment>
      )
    case 'list':
      return(
        <React.Fragment>
          {
            parts ? parts.map((part) => (
              <PartListCard key={part.id} part={part} image={`../assets/${part.assets.thumbnail}`} priceDisplay={priceDisplay}/>
            )) : <span>Loading...</span>
          }
        </React.Fragment>
      )
    default:
      return null
  }

}

const FilterPartCards = (partsRefs, parts) => {
    var idArray = partsRefs.map((part) => (
      part.id
    ))
    var output = parts.filter((part) => {
      for(var i=0; i<idArray.length; i++){
        return (idArray[i] === part.id);
      }
      return false;
    });
    return output;
}

const Parts = ({ libraryLayout, parts, collections, gridarea, store, priceDisplay }) => (
  <PartsGridWrapper gridarea={gridarea}>
    {
      store.bulkSelectionMode
      ?
      <PartsGridSelectionBar/>
      :
      null
    }
    <CardGrid libraryLayout={libraryLayout}>
      {
        ( parts && store.collection.Parts /* if Parts is undefined, All Parts is selected, so no filtering needed */) ?
        PartCards(FilterPartCards(store.collection.Parts,parts), priceDisplay, libraryLayout)
        :
        PartCards(parts, priceDisplay, libraryLayout)
      }
    </CardGrid>
  </PartsGridWrapper>
)

Parts.propTypes = {
  parts: PropTypes.array,
  collections: PropTypes.array,
  gridarea: PropTypes.string,
  store: PropTypes.object,
  priceDisplay: PropTypes.oneOf(["unit","quantity"]),
  libraryLayout: PropTypes.oneOf(['grid','list'])
};

/*
const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object }),
)
*/

export default compose(
  /*withStore,
  withHandlers({
    loadData: props => path => props.store.firestore.get(path)
  }),
  lifecycle({
    componentWillMount() {
      this.props.loadData('parts')
    }
  }),*/
  firestoreConnect(['parts','collections']),
  connect(
    (state, props) =>
        ({
      collections: state.firestore.ordered.collections,
      parts: state.firestore.ordered.parts,
      store: state.store
    })
  )
)(Parts)
