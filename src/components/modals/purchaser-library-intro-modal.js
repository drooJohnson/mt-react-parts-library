import React from 'react';
import { hideModal } from '../../redux/actions/modal';
import Modal from './modal';

class PurchaserLibraryIntroModal extends React.Component {
  onClose = () => {
    hideModal();
  }

  render() {
    return (
      <Modal onClose={()=>{this.onClose()}}>
         <div className="login">
           <h1>Login</h1>
         </div>
      </Modal>
    );
  }
}

export default PurchaserLibraryIntroModal;
