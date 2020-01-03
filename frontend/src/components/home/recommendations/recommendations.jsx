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
    const { similar } = this.props.recommendations;
    const { lastViewedInterest } = this.props;

    let lastViewedInterestTitle;

    if (lastViewedInterest) {
      lastViewedInterestTitle = lastViewedInterest.title;
    }

    return (
<<<<<<< HEAD
        <div className="recommendations-container">
          <section className="recommendations-direct">
            <header className="slider-header">Uniquely yours</header>
            <SimpleSlider items={this.props.recommendations} />
          </section>
        </div>
=======
      <div className='recommendations-container'>
        <section className='recommendations-similar'>
          <header className='slider-header'>
            <div className='slider-title'>
              Because you watched {lastViewedInterestTitle}
            </div>
          </header>
          <SimpleSlider items={similar} type={'recommendations'} />
        </section>
      </div>
>>>>>>> master
    );
  }
}

const msp = state => ({
  recommendations: state.entities.recommendations,
  lastViewedInterest: Object.values(state.entities.interests).pop()
});

const mdp = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres()),
  fetchSimilarRecommendations: () => dispatch(fetchSimilarRecommendations())
});

export default connect(msp, mdp)(Recommendations);
