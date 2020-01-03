import React from 'react';
import { connect } from 'react-redux';
import { fetchGenres } from '../../../actions/genre_actions';
import { fetchSimilarRecommendations } from '../../../actions/recommendation_actions';

class Recommendations extends React.Component {

  componentDidMount() {
    this.props.fetchSimilarRecommendations();
    this.props.fetchGenres();
  }

  render() {
    return (
      <div className='recommendations-container'>
        These are your recs
      </div>
    );
  }
}

const msp = state => ({
  recommendations: state.entities.recommendations
})

const mdp = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres()),
  fetchSimilarRecommendations: () => dispatch(fetchSimilarRecommendations())
});

export default connect(msp, mdp)(Recommendations);
