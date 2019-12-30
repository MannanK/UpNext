import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
// import AddServer from '../modal/add_server/add_server';

const Modal = ({ modal, closeModal }) => {
  if (!modal) {
    return null;
  }

  let component;

  switch (modal) {
    case 'tester':
      // component = <AddServer />
      component = <h1>thisismdodal</h1>
      break;
    default:
      return null;
  }

  return (
    <div className='modal-background' onClick={closeModal}>
      <div className='modal-child' onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );

};

const msp = state => ({
  modal: state.ui.modal
});

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(msp, mdp)(Modal);