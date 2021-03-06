import React from 'react';
import styled from 'styled-components';
import VerticalRule from '../components/vertical-rule';
import zIndex from '../components/utils/z-index';
import Row from '../components/layout/row';

import Search from '../components/inputs/search';
import Button from '../components/buttons';

const Title = styled.h1`
  font-size:24px;
  line-height:32px;
`

const Wrapper = styled.div`
  position:relative;
  z-index:${zIndex['mid']};
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
          <Title>Parts Library</Title>
          <RightWrapper>
            <Search/>
            <VerticalRule/>
            <Button type='success'>+ New Part</Button>
          </RightWrapper>
        </Row>
      </Wrapper>
    )
  }
}

export default Header
