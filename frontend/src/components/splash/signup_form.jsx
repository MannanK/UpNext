import React from 'react';
import { connect } from "react-redux";
import { signup, deleteErrors } from "../../actions/session_actions";


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrorHighlight = this.renderErrorHighlight.bind(this);

  }

  // componentDidUpdate(prevProps){
  //     if (prevProps.signedIn === true) {
  //         this.props.history.push('/login');
  //     }

  //     this.setState({errors: prevProps.errors});
  // }

  componentWillUnmount() {
    this.props.deleteErrors();
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

  renderErrorHighlight(type) {
    return this.props.errors[type] ? "error" : "";
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h2 className="form-heading">Sign Up</h2>

          <div className="signup-form">
            <input
              className={this.renderErrorHighlight("username")}
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <div className="error-caption">{this.props.errors.username}</div>

            <input
              className={this.renderErrorHighlight("email")}
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <div className="error-caption">{this.props.errors.email}</div>

            <input
              className={this.renderErrorHighlight("password")}
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <div className="error-caption">{this.props.errors.password}</div>

            <input
              className={this.renderErrorHighlight("password2")}
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
            <div className="error-caption">{this.props.errors.password2}</div>

            <button className="form-submit" type="submit">Sign Up</button>
          </div>
        </form>
      </>
    );
  }
}

////CONTAINER

const mapStateToProps = state => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: user => dispatch(signup(user)),
    deleteErrors: () => dispatch(deleteErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);