import React from 'react';
import { connect } from 'react-redux';
import SimpleSlider from '../slider/simple_slider';
import { fetchGenres } from '../../../actions/genre_actions';
import { fetchInterests } from '../../../actions/interest_actions';
import { fetchSimilarRecommendations, fetchAllRecommendations } from '../../../actions/recommendation_actions';
import Loading from "../loading/loading";

class Recommendations extends React.Component {
  componentDidMount() {
    // TODO: this shouldn't be here, fetchGenres() shouldn't be here either
    // this.props.fetchInterests();
    
    if (this.props.type === "similar") {
      this.props.fetchSimilarRecommendations();
    } else {
      this.props.fetchAllRecommendations();
      // this.props.fetchAllRecommendations();
    }
  }

  render() {
    // if (this.props.loading[`${this.props.type}Loading`]) {

    const { lastViewedInterest, type, loading } = this.props;

    let lastViewedInterestTitle = "";
    let sliderTitle;
    let recommendations;

    if (lastViewedInterest) {
      lastViewedInterestTitle = lastViewedInterest.title;
    }

    if (type === "similar") {
      sliderTitle = `Because you watched ${lastViewedInterestTitle}`;
      recommendations = this.props.recommendations.similar;
    } else {
      sliderTitle = `Because you're you!`;
      recommendations = this.props.recommendations.all;
    };

    
    if (loading[`${type}Loading`]) {
      return (
        <div className="recommendations-container">
          <section className="recommendations-similar">
            <header className="slider-header">
              <div className="slider-title">{sliderTitle}</div>
            </header>
            <Loading />
          </section>
        </div>
      );
    }
    return (
      <div className='recommendations-container'>
        <section className='recommendations-similar'>
          <header className='slider-header'>
            <div className='slider-title'>
              {sliderTitle}
            </div>
          </header>
          <SimpleSlider items={recommendations} type={'recommendations'} recType={type}/>
        </section>
      </div>
    );
  }
}

const msp = state => ({
  recommendations: state.entities.recommendations,
  lastViewedInterest: Object.values(state.entities.interests).sort((a,b) => {
    if(a.date > b.date) {
      return -1;
    } else if (a.date < b.date){
      return 1;
    }
    return 0;
  }).shift(),
  loading: state.ui.loading
});

const mdp = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres()),
  fetchSimilarRecommendations: () => dispatch(fetchSimilarRecommendations()),
  fetchAllRecommendations: () => dispatch(fetchAllRecommendations()),
  fetchInterests: () => dispatch(fetchInterests())
});

export default connect(msp, mdp)(Recommendations);
