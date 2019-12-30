import React from 'react';
import SignupFormContainer from './signup_form_container';
import LoginFormContainer from './login_form_container';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';

const SIGNUP = "signup";
const LOGIN = "login";

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formType: SIGNUP
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(field) {
    return e => (
      this.setState({
        formType: field
      })
    );
  }

  render() {
    const { formType } = this.state;

    let form;

    if (formType === SIGNUP) {
      form = <SignupFormContainer />;
    } else {
      form = <LoginFormContainer />;
    }

    return (
      <div className="splash-container">
        <h1 className="splash-title">UpNext</h1>
        
        { form }

        <div className="form-buttons">
          <button id="sign-up-button" onClick={this.handleClick(SIGNUP)}>Sign Up</button>
          <button id="login-button" onClick={this.handleClick(LOGIN)}>Login</button>
        </div>
      </div>
    );
  }
}

const msp = state => {
}

const mdp = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mdp)(Splash);