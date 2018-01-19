import React from 'react';
import { connect } from 'react-redux';

import PurchaserLibraryIntroModal from './purchaser-library-intro-modal';
import TestingModal from './testing-modal';

import { PURCHASER_LIBRARY_INTRO_MODAL, TESTING_MODAL } from '../../constants/ModalTypes';

const MODAL_COMPONENTS = {
  PURCHASER_LIBRARY_INTRO_MODAL: PurchaserLibraryIntroModal,
  TESTING_MODAL: TestingModal
};

const ModalContainer = (props) => {
  if (!props.modalType) {
    return null;
  }
  console.log(props);
  const SpecificModal = MODAL_COMPONENTS[props.modalType];
  console.log(SpecificModal);
  return <SpecificModal />;
};

const mapStateToProps = state => {
  return {
    modalType: state.store.modal.type
  }
};

export default connect(mapStateToProps)(ModalContainer);
