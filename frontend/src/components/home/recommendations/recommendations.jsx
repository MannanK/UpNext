import React from 'react';
import { connect } from 'react-redux';
// temp
import { fetchInterests } from '../../../actions/interest_actions';
// import { getRecommendations } from '../../../actions/recommendation_actions';
import SimpleSlider from '../slider/simple_slider';

class Recommendations extends React.Component {
  componentDidMount() {
    this.props.fetchInterests();
  }

  render() {
    return (
      <div className='recommendations-container'>
        <section className='recommendations-direct'>
          <header className='slider-header'>Uniquely yours</header>
          <SimpleSlider items={this.props.interests} />
        </section>
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

export default connect(msp, mdp)(Recommendations);