import React from 'react';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import {Link} from 'react-router-dom';
import zIndex from '../components/utils/z-index';

import Row from '../components/layout/row';

const Back = styled(Link)`
  color:#9b9b9b;
  display:inline-flex;
  text-transform:uppercase;
  font-weight:bold;
  font-size:12px;
  margin-right:24px;
  align-items:center;
  padding-left:24px;
  padding-right:28px;
  text-decoration:none;
  border-right:1px solid #ececec;
  &:hover{
    background:#fafafa;
  }
`

const PartName = styled.h3`
  font-size:18px;
  line-height:19.8px;
  display:inline-flex;
  align-items:center;
  font-weight:normal;
`

const Wrapper = styled.div`
  background:#fff;
  height:60px;
  display:flex;
  align-items:stretch;
  position:relative;
  z-index:${zIndex['mid']};
  grid-area:${props => props.gridarea || 'header'};
`

const LeftWrapper = styled.div`
  display:flex;
  margin-right:auto;
`

class Header extends React.Component {
  render(){
    return (
      <Wrapper>
        <Row>
          <LeftWrapper>
            <Back to={{
              pathname:"/parts",
              search:this.props.libraryLayout
            }}>
              <FontAwesomeIcon icon={faAngleLeft} style={{marginRight:'12px'}}/>
              BACK
            </Back>
            <PartName>Viewing Part: {this.props.partname}</PartName>
          </LeftWrapper>
        </Row>
      </Wrapper>
    )
  }
}

export default Header
