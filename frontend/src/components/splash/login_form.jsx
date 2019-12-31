import React from 'react';
import {withRouter} from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        email: '',
        password: ''
      };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrorHighlight = this.renderErrorHighlight.bind(this);
  }
 
  // componentDidUpdate(prevProps){
  //     if (prevProps.signedIn === true) {
  //         this.props.history.push('/');
  //     }
  //     this.setState({errors: prevProps.errors});
  // }

  componentWillUnmount() {
    this.props.deleteErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user={
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(user, this.props.history);
  }



//   renderErrors() {
//     return (
//       <ul className="session-errors">
//         {Object.keys(this.props.errors).map((error,i) => (
//           <li key={`error-${i}`}>
//             {this.props.errors[error]}
//           </li>
//         ))}
//       </ul>
//     );
//   }

    renderErrorHighlight(type) {
        return (this.props.errors[type]) ? "error" : "";
    }

    render() {

      return (
        <>
          <form onSubmit={this.handleSubmit}>
            <h2 className="form-heading">Login</h2>
            <div className="login-form">
              <input
                className={this.renderErrorHighlight("email")}
                type="email"
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

              <input className="form-submit" type="submit" value="Login" />
            </div>
          </form>
        </>
      );
  }
}

export default withRouter(LoginForm);