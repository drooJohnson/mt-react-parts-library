import React from 'react';
import { hideModal } from '../../redux/actions/modal';
import Modal from './modal';

class TestingModal extends React.Component {
  constructor(props) {
    super(props);
  }

  onClose = () => {
    hideModal();
  }

  render() {
    return (
      <Modal onClose={()=>{this.onClose()}}>
         <div className="login">
           <h1>TESTING</h1>
         </div>
      </Modal>
    );
  }
}

export default TestingModal;
