import LoginForm from './login_form';
import { connect } from 'react-redux';
import { login, deleteErrors } from '../../actions/session_actions';

const msp = state => {
  return {
    errors: state.errors.session
  };
};

const mdp = dispatch => {
  return {
    login: user => dispatch(login(user)),
    deleteErrors: () => dispatch(deleteErrors())
  };
};

export default connect(msp, mdp)(LoginForm);