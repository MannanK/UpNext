import React from 'react';
import SignupFormContainer from './signup_form';
import LoginFormContainer from './login_form';
import { login } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';

const SIGNUP = "signup";
const LOGIN = "login";

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formType: LOGIN
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleClick(field) {
    return e => (
      this.setState({
        formType: field
      })
    );
  }

  handleDemo(e) {
    this.props.login({ email: "tommy@duek.com", password: "hunter2" }); 
  }

  render() {
    const { formType } = this.state;

    let form;
    let button;
    let demo;

    if (formType === SIGNUP) {
      form = <SignupFormContainer />;
      button = (
        <span className="redirect">
          Have an account?{" "}
          <span onClick={this.handleClick(LOGIN)}>Log in!</span>
        </span>
      );
              // <button id="login-button" onClick={this.handleClick(LOGIN)}>Login</button>;
      demo = "";
    } else {
      form = <LoginFormContainer />;
      button = (
        <span className="redirect">
          New to UpNext?{" "}
          <span onClick={this.handleClick(SIGNUP)}>Sign up!</span>
        </span>
      );
      // <button id="sign-up-button" onClick={this.handleClick(SIGNUP)}>Sign Up</button>
      demo = <button id="demo-button" onClick={this.handleDemo}>DEMO</button>;
    }

    return (
      <div className="splash-container">
        <h1 className="splash-title">UpNext</h1>

        <div className={`${formType.toLowerCase()}-form-container`}>
          {form}

          {demo}
          <div className="form-button">
            {button}
          </div>
        </div>
      </div>
    );
  }
}

const mdp = dispatch => ({
  login: user => dispatch(login(user)),
  openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mdp)(Splash);