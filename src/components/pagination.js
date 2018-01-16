import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import faCaretLeft from '@fortawesome/fontawesome-free-solid/faCaretLeft';
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight';

const PaginationWrapper = styled.ul`
  background-color:#CCCCCC;
  list-style:none;
  display:flex;
  padding:0;
  margin-top:0;
  margin-bottom:0;
`

const PageBlock = (props) => {
  return (
    <Block><Label>{props.children}</Label></Block>
  )
}

const Block = styled.li`
  width:26px;
  height:26px;
  background-color:#ffffff;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Label = styled.a`
  font-size:12px;
  font-weight:bold;
  color:#cccccc;
`

class Pagination extends React.Component {
  constructor(props){
    super(props);
    // pageCount !
    // pageRangeDisplayed !
    // marginPagesDisplayed !
  }
  render(){
    return (
      <PaginationWrapper style={this.props.style}>
        <PageBlock>l</PageBlock>
        <PageBlock>1</PageBlock>
        <PageBlock>2</PageBlock>
        <PageBlock>3</PageBlock>
        <PageBlock>...</PageBlock>
        <PageBlock>7</PageBlock>
        <PageBlock>r</PageBlock>
      </PaginationWrapper>
    )
  }
}
export default Pagination
