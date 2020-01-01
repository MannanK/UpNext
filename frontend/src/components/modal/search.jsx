import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { omdbApiKey } from '../../config/keys';
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
    this.makeDebouncedSearch = debounce(this.makeDebouncedSearch, 700);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput(e) {
    let keyword = e.currentTarget.value;

    this.setState({keyword});

    // 1. make the omdb call to get the final interest the user chose
    if (keyword !== "") {
      this.makeDebouncedSearch(keyword);
    }
  }

  makeDebouncedSearch(keyword) {
    const instance = axios.create();
    instance.defaults.headers.common = {};
    instance.defaults.headers.common.accept = 'application/json';

    instance
      .get(`http://www.omdbapi.com/?s=${keyword}&type=movie&apikey=${omdbApiKey}`)
      .then(response => {
        let searchResults = response.data.Search;

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
  handleClick(title, year) {
    return e => {
      e.preventDefault();

      const instance = axios.create();
      instance.defaults.headers.common = {};
      instance.defaults.headers.common.accept = 'application/json';

      instance
        .get(`http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${omdbApiKey}`)
        .then(response => {
          console.log(response.data);

          this.props.createInterest(response.data);
          this.props.closeModal();
        });
    };
  }

  render() {
    const {searchResults} = this.state;

    let results = !isEmpty(searchResults) ? (
      <ul className="search-results">
        {searchResults.map((result, idx) => {
          return <li onClick={this.handleClick(result.Title, result.Year)} key={idx}>{result.Title} ({result.Year})</li>
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