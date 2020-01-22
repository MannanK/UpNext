import React from 'react';
import { connect } from 'react-redux';
import { createInterest } from '../../actions/interest_actions';
import { createSimilarRecommendations, fetchSimilarRecommendations } from '../../actions/recommendation_actions';
import { createGenre, updateGenre } from '../../actions/genre_actions';
import * as TMDBAPIUtil from '../../util/tmdb_api_util';
// const keys = require('../../config/keys');

// had to append REACT_APP at the front of the config var in Heroku in order for
// React to know to embed the var inside process.env
const debounce = require("lodash.debounce");
const isEmpty = require("lodash.isempty");

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      searchResults: []
    };

    this.handleInput = this.handleInput.bind(this);
    this.makeDebouncedSearch = debounce(this.makeDebouncedSearch, 350);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    // without this, we get a memory leak error
    // after unmounting the debounced function was still getting called, and
      // therefore we were trying to setState for searchResults after the
      // component had already unmounted
    this.makeDebouncedSearch.cancel();
  }

  handleInput(e) {
    let keyword = e.currentTarget.value;

    // 1. make the omdb call to get the final interest the user chose
    if (keyword !== "") {
      this.setState({ keyword });
      this.makeDebouncedSearch(keyword);
    } else {
      this.props.closeModal();
    }
  }

  makeDebouncedSearch(keyword) {
    TMDBAPIUtil.getMovieSuggestions(keyword)
      .then(response => {
        let searchResults = response.data.results;
        
        // Removes any search results that are missing metadata like date or poster
        let sanitizedResults = this.movieFieldSanitizer(searchResults);

        if (!isEmpty(sanitizedResults)) {
          sanitizedResults = sanitizedResults.slice(0, 10);
        }

        this.setState({
          searchResults: sanitizedResults
        });
      });
  }

  movieFieldSanitizer(movies) {
    return movies.reduce((store, entry) => {
      if (!Object.values(entry).some(field => field === null) && !this.props.movieIds[entry.id]) {
        store.push(entry);
      }
      return store;
    }, []);
  }

  // first make a call to omdb to get the full interest info
  // then make a call to our own backend with the return value of that, to add
    // a new interest
  handleClick(id) {
    return e => {
      e.preventDefault();

      TMDBAPIUtil.getMovieInfo(id)
        .then(response => {
          Promise.all([this.props.createInterest(response.data)]).then(() => {
            // genres calculation
            const { genres } = this.props;
            response.data.genres.forEach(genre => {
              if (genres[genre.name]) {
                this.props.updateGenre(genres[genre.name]._id, { value: 1 });

              } else {
                this.props.createGenre(genre);
              }
            });
            this.props.fetchSimilarRecommendations();
            this.props.closeModal();
          });
      });

      // May refactor in the future so that recommendations are made only after and if createInterest and closeModal are successful
      TMDBAPIUtil.getSimilarRecommendations(id)
        .then(response => {
          let count = 0;
          let recommendations = [];

          const promises = response.data.results.map((recommendation) => {
            let recId = recommendation.id;
            return TMDBAPIUtil.getMovieInfo(recId)
              .then(movie => {
                const sanitizedRec = this.movieFieldSanitizer([movie]);

                if (!isEmpty(sanitizedRec)) {
                  if (!this.props.movieIds[movie.data.id]) {
                    count += 1;

                    recommendation.genres = movie.data.genres;
                    recommendation.runtime = movie.data.runtime;
                    recommendation.similarMovieId = id;

                    recommendations.push(recommendation);
                    if (count === 15) this.props.closeModal();
                  }
                }

              });
          })

          Promise.all(promises)
            .then(() => {
              this.props.createSimilarRecommendations(recommendations);
              this.props.closeModal();
            })

        });
    }
  }

  render() {
    const {searchResults} = this.state;
    
    let sorted = searchResults.sort((a, b) => (a.release_date < b.release_date) ? 1 : -1);

    let results = !isEmpty(searchResults) ? (
      <ul className="search-results">
        {sorted.map((result, idx) => {
          let year = result.release_date.slice(0,4);
          return (
            <li onClick={this.handleClick(result.id)} key={idx}>
              <span>
                {result.title} ({year})
              </span>
            </li>
          );})}
      </ul> ) : "";


    return(
      <div className='search-container'>
        <input
          type="text"
          placeholder="Search..."
          className='search-input'
          onChange={this.handleInput}
          autoFocus/>
        <div>
          {results}
        </div>
      </div>
    );
  }
}

const msp = state => {
  let movieIdObj = {};

  ///refactor after algorithm

  if (!isEmpty(state.entities.interests)) {
    for (let key in state.entities.interests) {
      let movieId = state.entities.interests[key].movieId;
      movieIdObj[movieId] = true;
    }
  }
    return {
      genres: state.entities.genres,
      movieIds: movieIdObj
    };
}

const mdp = dispatch => ({
  createInterest: data => dispatch(createInterest(data)),
  createSimilarRecommendations: data => dispatch(createSimilarRecommendations(data)),
  fetchSimilarRecommendations: () => dispatch(fetchSimilarRecommendations()),
  createGenre: data => dispatch(createGenre(data)),
  updateGenre: (genreId, value) => dispatch(updateGenre(genreId, value))
});

export default connect(msp, mdp)(Search);