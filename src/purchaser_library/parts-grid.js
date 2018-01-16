import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withContext, getContext, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import { isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase'

import styled from 'styled-components';

import PartsGridSelectionBar from './parts-grid-selection-bar';
import PartCard from './part-card';

// CardGrid > CardItem > CardPart > [CardOverlay > CardOverlayButton], PartBadge, PartName
let partsArr = [
  {id:1,name:"MT0001",priced:true},
  {id:2,name:"MT0002",priced:false},
  {id:3,name:"MT0003",priced:true},
  {id:4,name:"MT0004",priced:true},
  {id:5,name:"MT0005",priced:true},
  {id:6,name:"MT0006",priced:true},
  {id:7,name:"MT0007",priced:true},
  {id:8,name:"MT0008",priced:true},
  {id:9,name:"MT0009",priced:true},
  {id:10,name:"MT00010",priced:true},
  {id:11,name:"MT00011",priced:true},
  {id:12,name:"MT00012",priced:true},
  {id:13,name:"MT00013",priced:true},
  {id:14,name:"MT00014",priced:true},
  {id:15,name:"MT00015",priced:true},
  {id:16,name:"MT00016",priced:true},
]

const CardGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
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

const PartsGrid = ({ parts, gridarea, store }) => (
  <PartsGridWrapper gridarea={gridarea}>
    {
      store.bulkSelectionMode
      ?
      <PartsGridSelectionBar/>
      :
      null
    }
    <CardGrid>
      {
        parts
        ?
        parts.map((part) => (
          <PartCard key={part.id} part={part} />
        ))
        :
        <span>Loading</span>
      }
    </CardGrid>
  </PartsGridWrapper>
)

PartsGrid.propTypes = {
  parts: PropTypes.array,
  gridarea: PropTypes.string,
  store: PropTypes.object
};

const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object }),
)

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
  firestoreConnect(['parts']),
  connect(
    (state, props) =>
        ({
      parts: state.firestore.ordered.parts,
      store: state.store
    })
  )
)(PartsGrid)
