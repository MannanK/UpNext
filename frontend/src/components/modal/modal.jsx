import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import Search from '../modal/search';

const Modal = ({ modal, closeModal }) => {
  if (!modal) {
    return null;
  }

  let component;
  let modalBackClass;
  let modalChildClass;

  switch (modal) {
    case 'tester':
      component = <Search closeModal={closeModal}/>
      modalBackClass = 'grey-background';
      modalChildClass = 'search-child';
      break;
    default:
      return null;
  }

  return (
    <div className={modalBackClass} onClick={closeModal}>
      <div className={modalChildClass} onClick={e => e.stopPropagation()}>
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