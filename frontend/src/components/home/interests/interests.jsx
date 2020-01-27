import React from 'react';
import { connect } from 'react-redux';
import SimpleSlider from '../slider/simple_slider';
import { fetchInterests } from '../../../actions/interest_actions';
import { updateGenre } from '../../../actions/genre_actions';
import * as TMDBAPIUtil from '../../../util/tmdb_api_util';
import { createAllRecommendations } from '../../../actions/recommendation_actions';

const isEmpty = require("lodash.isempty");

class Interests extends React.Component {
  componentDidMount() {
    this.props.fetchInterests();
  }

  componentDidUpdate(prevProps) {
    // can check if interests have changed
    if (Object.keys(prevProps.interests).length !== Object.keys(this.props.interests).length) {
      const { genres, interests } = this.props;
      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~ first CL");
      // console.log(genres);
      Object.values(genres).forEach(genre => {
        // console.log("-----line 16 interests.jsx-----");
        this.props.updateGenre(genres[genre.name]._id, { value: 0 });
      });
    // without checking if the previous genres were not empty, we see a split second of the default API call where
      // genreIds is an empty arr and TMDB returns a default results response, because initially the genres slice of
      // state is empty
    }
    
    // console.log("genresChanged: ");
    // console.log(this.genresChanged(prevProps.genres, this.props.genres));
    // console.log("!isEmpty: ");
    // console.log(!isEmpty(prevProps.genres));
    
    if (this.genresChanged(prevProps.genres, this.props.genres) && !isEmpty(this.props.genres)) {
      // filter genre slice of state to get superlike genre array
      // call getAllRecommendations
      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      // console.log(Object.values(this.props.genres).filter(ele => ele.tier === "superLike"));
      let superLikeArr = Object.values(this.props.genres).filter(ele => ele.tier === "superLike").map(el => el.id);
      // const promises = [];
      let recommendations = [];
      TMDBAPIUtil.getAllRecommendations(superLikeArr)
        .then(response => {
          const promisesA = [];
          for (let i=0; i < Math.min(response.data.results.length,15); i++) {
            let recommendation = response.data.results[i];
            let recId = recommendation.id;
            promisesA.push(TMDBAPIUtil.getMovieInfo(recId)
              .then(movie => {
                if (!this.props.interests[movie.data.id]) {
                  recommendation.genres = movie.data.genres;
                  recommendation.runtime = movie.data.runtime;
                  recommendations.push(recommendation);
                }
              })
            );
          }
          Promise.all(promisesA)
            .then(() => {
              let likeArr = Object.values(this.props.genres).filter(ele => ele.tier === "like").map(el => el.id);
              TMDBAPIUtil.getAllRecommendations(likeArr)
              .then(response => {
                const promisesC = [];
                for (let i=0; i < Math.min(response.data.results.length,10); i++) {
                  let recommendation = response.data.results[i];
                  let recId = recommendation.id;
                  promisesC.push(TMDBAPIUtil.getMovieInfo(recId)
                    .then(movie => {
                      if (!this.props.interests[movie.data.id]) {
                        recommendation.genres = movie.data.genres;
                        recommendation.runtime = movie.data.runtime;
                        recommendations.push(recommendation);
                      }
                    })
                  );
                }
                Promise.all(promisesC)
                  .then(() => {
                    this.props.createAllRecommendations(recommendations);
                  });
              });
            });
          }
        );
    }
  }

  genresChanged(prevGenres, currentGenres) {
    let prevValues = Object.values(prevGenres);
    let currentValues = Object.values(currentGenres);

    // console.log("prevValues: ");
    // console.log(prevValues);
    // console.log("currentValues: ");
    // console.log(currentValues);

    if (prevValues.length !== currentValues.length) return true;

    for(let i=0; i < currentValues.length; i++) {
      if (currentValues[i].tier !== prevValues[i].tier) {
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <div className="interests-container">
        <header className='slider-header'>
          <div className='slider-title'>
            Your Interests
          </div>
        </header>
        <SimpleSlider items={this.props.interests} type={'interests'}/>
      </div>
    );
  }
}

const msp = state => ({
  interests: state.entities.interests,
  genres: state.entities.genres
});

const mdp = dispatch => ({
  fetchInterests: () => dispatch(fetchInterests()),
  updateGenre: (genreId,value) => dispatch(updateGenre(genreId,value)),
  createAllRecommendations: data => dispatch(createAllRecommendations(data))
});

export default connect(msp, mdp)(Interests);