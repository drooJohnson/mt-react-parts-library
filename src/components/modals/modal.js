import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import zIndex from '../../components/utils/z-index';

import { HIDE_MODAL, HIDE_SCRIM } from '../../constants/ActionTypes';

const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndex.top};
  overflow: auto;
  text-align: center;
  padding: 4px;
  cursor: pointer;
  &:after{
    vertical-align:middle;
    display:inline-block;
    height:100%;
    margin-left:-0.05em;
    content: '';
  }
`

const ModalWrapper = styled.div`
  position:relative;
  outline: 0;
  width:auto;
  display:inline-block;
  vertical-align:middle;
  max-width:auto;
  cursor:default;
  border-radius:4px;
`

class Modal extends React.Component {
  listenKeyboard = (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      this.props.onClose();
    }
  }
  componentDidMount() {
    if (this.props.onClose) {
      window.addEventListener(
        'keydown',
        this.listenKeyboard,
        true
      );
    }
  }
  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener(
        'keydown',
        this.listenKeyboard,
        true
      );
    }
  }

  onOverlayClick = (e) => {
    this.props.onClose();
  }

  onDialogClick = (e) => {
    e.stopPropogation();
  }

  render() {
    return (
      <Content onClick={this.onOverlayClick}>
        <ModalWrapper onClick={this.onDialogClick}>
          {this.props.children}
        </ModalWrapper>
      </Content>
    )
  }
}

export default connect(
  (state, props) =>
    ({
      modal: state.store.modal
    }),
    (dispatch) => ({
      onClose: () => {
        dispatch({type:HIDE_MODAL});
        dispatch({type:HIDE_SCRIM});
      }
    })
  )(Modal);
