import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';

const Splash = ({ openModal }) => {
  return(
    <div>
      <h1>This is the temp component</h1>
      <button onClick={() => openModal('tester')}>clickme</button>
    </div>
  );
};

const msp = state => {
}

const mdp = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mdp)(Splash);