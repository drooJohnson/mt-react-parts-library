import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Row from '../layout/row';
import Col from '../layout/col';

import Search from '../inputs/search';
import Button from '../components/buttons';

const Title = styled.h1`
  font-size:24px;
  line-height:32px;
`

const Wrapper = styled.div`
  background:#fff;
  padding:16px 10px;
  grid-area:${props => props.gridarea || 'header'};
`

const VerticalRule = styled.div`
  content: "";
  border-left: 1px solid #ccc;
  width: 1px;
  right: -15px;
  bottom: 3px;
  top: 3px;
  margin-left: 16px;
  margin-right: 16px;
`

const RightWrapper = styled.div`
  display:flex;
  margin-left:auto;
`
/*
const PartBadge = styled.div`
  justify-self:flex-start;
  padding:6px 10px;
  border-radius:14px;
  line-height:11px;
  font-size:11px;
  display:inline-block;
  letter-spacing:1px;
  border:solid 1px black;
  flex-grow:0;
  background-color: ${props => props.nature ? badges[props.nature].backgroundColor : null};
  border-color: ${props => props.nature ? badges[props.nature].borderColor : null};
  color: ${props => props.nature ? badges[props.nature].textColor : null};
`

PartBadge.propTypes = {
  nature: PropTypes.oneOf(['primary','caution','error','info','success'])
}

*/

class Header extends React.Component {
  constructor(){
    super();
    //const part = this.props.part;
  }
  render(){
    const part = this.props.part;
    return (
      <Wrapper>
        <Row>
          <Title>Title</Title>
          <RightWrapper>
            <Search/>
            <VerticalRule/>
            <Button nature='success'>+ New Part</Button>
          </RightWrapper>
        </Row>
      </Wrapper>
    )
  }
}

export default Header
