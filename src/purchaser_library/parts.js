import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'

import styled from 'styled-components';

import PartsSelectionBar from './parts-selection-bar';
import PartContainer from './part-container';

const CardGridWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: start;
  grid-area: ${props => props.gridarea};
`

const CardGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 8px;
  grid-column-gap: 8px;
  grid-auto-flow: row;
  position: relative;
  overflow-y: scroll;
`

// Filter out parts that aren't present in PartsRefs.
const FilterPartCards = ( partsRefs, parts ) => {
    var idArray = partsRefs.map((part) => (part.id)) // Create array of the parts refs' ids. The parts refs' come from a collection, which is how I've modeled that one-to-many relationship.
    var output = parts.filter((part) => {
      for(var i=0; i<idArray.length; i++){
        return (idArray[i] === part.id); // If the parts' ids match those in the array of ids from the partsRefs, return true and add that part to the output variable.
      } return false;
    });
    return output; // Return the new array of filtered parts.
}

// Populate the library with those parts passed in as `parts`
const PartCards = ( parts, priceDisplay, libraryLayout, hoverOverlayEnabled ) => {
  return(
    <React.Fragment>
      { parts
        ? parts.map((part) => (<PartContainer key={part.id} part={part} image={`../assets/${part.assets.thumbnail}`} hoverOverlayEnabled={hoverOverlayEnabled} priceDisplay={priceDisplay} libraryLayout={libraryLayout}/>))
        : <span>Loading...</span>
      }
    </React.Fragment>
  )
}

const Parts = ({ libraryLayout, parts, collections, gridarea, store, priceDisplay }) => (
  <CardGridWrapper gridarea={gridarea}>
    { store.bulkSelectionMode
      ? <PartsSelectionBar/>
      : null
    }
    <CardGrid>
      {( parts && store.collection.Parts ) /* if Parts is undefined, All Parts is selected, so no filtering needed */
        ? PartCards( FilterPartCards( store.collection.Parts, parts ), priceDisplay, libraryLayout, true )
        : PartCards( parts, priceDisplay, libraryLayout, true )
      }
    </CardGrid>
  </CardGridWrapper>
)

Parts.propTypes = {
  parts: PropTypes.array,
  collections: PropTypes.array,
  gridarea: PropTypes.string,
  store: PropTypes.object,
  priceDisplay: PropTypes.oneOf([ "unit", "quantity" ]),
  libraryLayout: PropTypes.oneOf([ 'grid', 'list' ])
}

export default compose(
  firestoreConnect([ 'parts', 'collections' ]),
  connect(
    (state, props) =>
      ({
        collections: state.firestore.ordered.collections,
        parts: state.firestore.ordered.parts,
        store: state.store
      })
  )
)(Parts)
