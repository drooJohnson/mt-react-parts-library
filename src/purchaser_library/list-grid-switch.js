import React from 'react';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAlignJustify from '@fortawesome/fontawesome-free-solid/faAlignJustify';
import faThLarge from '@fortawesome/fontawesome-free-solid/faThLarge';

const SwitchWrapper = styled.div`
  width:auto;
  height:auto;
`

class ListGridSwitch extends React.Component {
  componentWillMount(){
    this.active = this.props.active;
    this.IconStyle = {
      color: this.active ? '#4eeeb9' : '#CCCCCC',
    }
  }
  render(){
    return(
      <SwitchWrapper active={this.props.active}>
        <FontAwesomeIcon icon={faAlignJustify} style={{fontSize:24, color: this.active === 'list' ? '#4eeeb9' : '#CCCCCC',}}/>
        <FontAwesomeIcon icon={faThLarge} style={{fontSize:24,marginLeft:12, color: this.active === 'grid' ? '#4eeeb9' : '#CCCCCC',}}/>
      </SwitchWrapper>
    )
  }
}

export default ListGridSwitch
