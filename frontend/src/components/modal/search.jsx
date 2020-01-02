import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { tmdbApiKey } from '../../config/keys';
import { createInterest } from '../../actions/interest_actions';

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
    const instance = axios.create();
    instance.defaults.headers.common = {};
    instance.defaults.headers.common.accept = 'application/json';

    // https://developers.themoviedb.org/3/search/search-movies

    instance
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${keyword}&include_adult=false`)
      .then(response => {
        let searchResults = response.data.results;

        if (!isEmpty(searchResults)) {
          searchResults = searchResults.slice(0, 9);
        }

        this.setState({
          searchResults
        });
      });
  }

  // first make a call to omdb to get the full interest info
  // then make a call to our own backend with the return value of that, to add
    // a new interest
  handleClick(id) {
    return e => {
      e.preventDefault();

      const instance = axios.create();
      instance.defaults.headers.common = {};
      instance.defaults.headers.common.accept = 'application/json';

      // https://developers.themoviedb.org/3/movies/get-movie-details

      instance
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`)
        .then(response => {
          this.props.createInterest(response.data);
          this.props.closeModal();
        });
    };
  }

  render() {
    const {searchResults} = this.state;
    
    let sorted = searchResults.sort((a, b) => (a.release_date < b.release_date) ? 1 : -1);

    let results = !isEmpty(searchResults) ? (
      <ul className="search-results">
        {sorted.map((result, idx) => {
          let year = result.release_date.slice(0,4);
          return <li onClick={this.handleClick(result.id)} key={idx}>{result.title} ({year})</li>
        })}
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

const mdp = dispatch => ({
  createInterest: data => dispatch(createInterest(data))
});

export default connect(null, mdp)(Search);