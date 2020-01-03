import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import keys from "../../config/keys";
import { createInterest, deleteInterest } from "../../actions/interest_actions";
import { fetchSimilarRecommendations, createSimilarRecommendations } from '../../actions/recommendation_actions';

const tmdbApiKey = keys.tmdbApiKey;

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.addInterest = this.addInterest.bind(this);
    this.removeFromInterests = this.removeFromInterests.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleRuntime = this.handleRuntime.bind(this);
    this.months = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
  }

  addInterest(e) {
    e.preventDefault();
    let id = this.props.detailsItem.movieId;
    this.props.detailsItem.id = this.props.detailsItem.movieId;
    this.props.detailsItem.release_date = this.props.detailsItem.year;
    this.props.detailsItem.poster_path = this.props.detailsItem.poster;
    this.props.detailsItem.vote_average = this.props.detailsItem.voteAverage;
    this.props.detailsItem.vote_count = this.props.detailsItem.voteCount;

    const instance = axios.create();
    instance.defaults.headers.common = {};
    instance.defaults.headers.common.accept = "application/json";

    // https://developers.themoviedb.org/3/movies/get-movie-details

    this.props.createInterest(this.props.detailsItem);
    // setTimeout(() => {
    //   this.props.fetchSimilarRecommendations();
    //   this.props.closeModal();
    // }, 30);

    // May refactor in the future so that recommendations are made only after and if createInterest and closeModal are successful
    instance
      .get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${tmdbApiKey}`
      )
      .then(response => {
        let count = 0;
        let recommendations = [];

        const promises = response.data.results.map(recommendation => {
          let recId = recommendation.id;
          return instance
            .get(
              `https://api.themoviedb.org/3/movie/${recId}?api_key=${tmdbApiKey}`
            )
            .then(movie => {
              count += 1;

              recommendation.genres = movie.data.genres;
              recommendation.runtime = movie.data.runtime;
              recommendation.similarMovieId = id;

              recommendations.push(recommendation);
              if (count === 15) this.props.closeModal();
            });
        });

        Promise.all(promises).then(() => {
          this.props.createSimilarRecommendations(recommendations);
          this.props.closeModal();
        });
      });
  }

  removeFromInterests(e) {
    e.preventDefault();
    
    this.props.deleteInterest( this.props.detailsId );

    setTimeout(() => {
      this.props.fetchSimilarRecommendations();
      this.props.closeModal();
    }, 30);
  }

  handleDate(date) {
    let dateArr = date.split("-");
    return `${dateArr[2]} ${this.months[dateArr[1] - 1]} ${dateArr[0]}`;
  }

  handleRuntime(time) {
    let hour = Math.floor(time / 60);
    let minute = time % 60;

    return (hour === 0) ? `${minute} min` :
           (minute === 0) ? `${hour} hr` :
           (hour > 0 && minute > 0) ? `${hour} hr ${minute} min` :
           "";
  }

  render() {
    const detailsItem = this.props.detailsItem || {};

    ///RENDER BUTTONS
    let button = (this.props.detailsType === "recommendations") ? (
      <button className="interest-button" onClick={this.addInterest}>
        Add to Interests
      </button>
    ) : (
      <button className="interest-button" onClick={this.removeFromInterests}>
        Remove from Interests
      </button>
    )

    debugger
    let genres = detailsItem.genres.slice(0,3).map((genre) => genre.name);


    

    return (
      <>
        <div className="detail-heading">
          <h3 className="detail-title">{detailsItem.title}</h3>
        </div>

        <section className="detail-container">
          <section className="top-half">
            <div className="poster">
              <img
                src={`https://image.tmdb.org/t/p/w500/${detailsItem.poster}`}
                alt="poster"
              />
            </div>

            <div className="runtime-scores">
              <div className="ratings-container">
                <div className="star">
                  <i className="fas fa-star"></i>
                </div>

                <div className="score-votes">
                  <span className="score-num">
                    {detailsItem.voteAverage}
                    <span>/10</span>
                  </span>
                  <span className="vote-count">{`${detailsItem.voteCount} votes`}</span>
                </div>
              </div>

              <span className="year">
                <span>Release Date:</span>
                <span>{this.handleDate(detailsItem.year)}</span>
              </span>
              <span className="runtime">
                <span>Runtime:</span>
                <span>{this.handleRuntime(detailsItem.runtime)}</span>
              </span>

              <div className="genres">
                <span>Genres:</span>
                <span>{genres.join(", ")}</span>
              </div>
            </div>
          </section>

          <div className="overview">{detailsItem.overview}</div>

          {button}
        </section>
      </>
    );
  }
  
}


const msp = (state, ownProps) => {
  let detailsItem;
  if (ownProps.detailsType === "recommendations") {
    ///HARDCODED TO GET INTO SIMILAR SLICE OF STATE
    detailsItem = state.entities[ownProps.detailsType].similar[ownProps.detailsId];
  } else {
    detailsItem = state.entities[ownProps.detailsType][ownProps.detailsId];

  }

  return {
    detailsItem
  }
}

const mdp = dispatch => ({
  createInterest: data => dispatch(createInterest(data)),
  deleteInterest: data => dispatch(deleteInterest(data)),
  fetchSimilarRecommendations: data => dispatch(fetchSimilarRecommendations(data)),
  createSimilarRecommendations: data => dispatch(createSimilarRecommendations(data))
});

export default connect(msp, mdp)(Details);