import React from 'react';
import styled from 'styled-components';
import VerticalRule from '../components/vertical-rule';

import Row from '../layout/row';

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

const RightWrapper = styled.div`
  display:flex;
  margin-left:auto;
`

class Header extends React.Component {
  render(){
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
