import React from 'react';
import { connect } from 'react-redux';
import SimpleSlider from '../slider/simple_slider';
import { fetchInterests } from '../../../actions/interest_actions';

class Interests extends React.Component {
  componentWillMount() {
    this.props.fetchInterests();
  }

  render() {
    return (
      <div className="interests-container">
        <header className='interests-header'>Your interests</header>
        <SimpleSlider items={this.props.interests}/>
      </div>
    );
  }
}

const msp = state => ({
  interests: state.entities.interests
});

const mdp = dispatch => ({
  fetchInterests: () => dispatch(fetchInterests())
});

export default connect(msp, mdp)(Interests);