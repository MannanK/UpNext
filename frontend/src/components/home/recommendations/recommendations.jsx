import React from 'react';
import { connect } from 'react-redux';
import SimpleSlider from '../slider/simple_slider';
import { fetchGenres } from '../../../actions/genre_actions';
import { fetchSimilarRecommendations } from '../../../actions/recommendation_actions';

class Recommendations extends React.Component {
  componentDidMount() {
    this.props.fetchSimilarRecommendations();
    this.props.fetchGenres();
  }

  render() {
    return (
        <div className="recommendations-container">
          <section className="recommendations-direct">
            <header className="slider-header">Uniquely yours</header>
            <SimpleSlider items={this.props.recommendations} />
          </section>
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
