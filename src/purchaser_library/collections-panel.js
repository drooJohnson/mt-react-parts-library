import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
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

const Sizer = styled.div`

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
`

const CollectionInner = styled.div`
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
`

const Name = styled.span`
  flex-grow:1;
`

const PartCount = styled.span`
  margin-left:auto;
`

class Collection extends React.Component {
  render(){
    console.log(this);
    return(
        <CollectionInner active={this.props.active}>
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
        <span style={{marginLeft:'auto'}}>+</span>
      </HeaderWrapper>
    )
  }
}

const SyncWrapper = styled.div`
  padding:5px;
  background:#ffffff;
  grid-area:collections-footer;
`

const SyncButton = Button.extend`
  width:100%;
  margin:0;
  justify-content:center;
`
class A360Area extends React.Component {
  render(){
    return (
      <SyncWrapper><SyncButton nature="info">Sync With A360</SyncButton></SyncWrapper>
    )
  }
}

class CollectionsPanel extends React.Component {
 render(){
   console.log(this);
   return (

     <Wrapper gridarea={this.props.gridarea}>
       <CollectionsHeader/>
       <div style={{gridArea:'collections-body'}}>
           <Collection name="name" partCount="1000"/>
           <Collection name="name" partCount="1000"/>
           <Collection name="name" partCount="1000" active/>
           <Collection name="name" partCount="1000"/>
           <Collection name="name" partCount="1000"/>
           <Collection name="name" partCount="1000"/>
           <Collection name="name" partCount="1000"/>
       </div>
       <A360Area/>
     </Wrapper>
   )
 }
}


export default CollectionsPanel
