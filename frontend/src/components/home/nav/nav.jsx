import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import { openModal } from '../../../actions/modal_actions';

class Nav extends React.Component {

  render() {
    const { logout, openModal } = this.props;

    return(
      <nav className='nav-container'>
        <header className='nav-header'> 
          <div>UpNext</div>
          <button
            className='logout-button'
            onClick={logout}>
            Logout
          </button>
        </header>

        <div className='nav-search'>
          <input
            type="text"
            placeholder="Search..."
            className='nav-search-input'
            onClick={() => openModal('tester')}/>
        </div>
      </nav>
    );
  }
}

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mdp)(Nav);