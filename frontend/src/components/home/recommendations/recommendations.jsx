import React from 'react';
import { connect } from 'react-redux';
import SimpleSlider from '../slider/simple_slider';
import { fetchGenres } from '../../../actions/genre_actions';
import { fetchInterests } from '../../../actions/interest_actions';
import { fetchSimilarRecommendations } from '../../../actions/recommendation_actions';

class Recommendations extends React.Component {
  componentDidMount() {
    console.log("mounting");
    this.props.fetchInterests();
    this.props.fetchSimilarRecommendations();
    this.props.fetchGenres();
  }

  render() {
    const { similar } = this.props.recommendations;

    // const similar = {
    //   1: { name: 'hello1' },
    //   2: { name: 'hello2' },
    //   3: { name: 'hello3' },
    //   4: { name: 'hello4' },
    //   5: { name: 'hello5' },
    //   6: { name: 'hello6' },
    //   7: { name: 'hello7' },
    //   8: { name: 'hello8' },
    //   9: { name: 'hello9' },
    //   10: { name: 'hello10' },
    //   11: { name: 'hello11' },
    //   12: { name: 'hello12' },
    //   13: { name: 'hello13' },
    //   14: { name: 'hello14' },
    //   15: { name: 'hello15' },
    // };

    const { lastViewedInterest } = this.props;

    let lastViewedInterestTitle;

    if (lastViewedInterest) {
      lastViewedInterestTitle = lastViewedInterest.title;
    }

    return (
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
    );
  }
}

const msp = state => ({
  recommendations: state.entities.recommendations,
  lastViewedInterest: Object.values(state.entities.interests).pop()
});

const mdp = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres()),
  fetchSimilarRecommendations: () => dispatch(fetchSimilarRecommendations()),
  fetchInterests: () => dispatch(fetchInterests())
});

export default connect(msp, mdp)(Recommendations);
