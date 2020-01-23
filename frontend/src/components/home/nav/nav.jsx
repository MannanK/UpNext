import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import { openModal } from '../../../actions/modal_actions';

class Nav extends React.Component {

  render() {
    const { logout, openModal } = this.props;

    return (
      <nav className="nav-container">
        <header className="nav-header">
          <div className="nav-logo-container">
            <img
              className="nav-logo-main"
              src={require("../../../assets/images/logo_an.png")}
              alt="logo"
            />

            <img
              className="nav-logo-gray two dark"
              src={require("../../../assets/images/rarrow.png")}
              alt="logo"
            />
            <img
              className="nav-logo-gray one dark"
              src={require("../../../assets/images/rarrow.png")}
              alt="logo"
            />
            <img
              className="nav-logo-gray two slide"
              src={require("../../../assets/images/grarrow.png")}
              alt="logo"
            />
            <img
              className="nav-logo-gray one slide"
              src={require("../../../assets/images/grarrow.png")}
              alt="logo"
            />
          </div>
          <div className="nav-buttons">
            <button
              className="about-button"
              onClick={() => openModal({ type: "about" })}
            >
              About
            </button>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>

          </div>
        </header>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search..."
            className="nav-search-input"
            onClick={() => openModal({ type: "search" })}
            onFocus={() => openModal({ type: "search" })}
          />
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