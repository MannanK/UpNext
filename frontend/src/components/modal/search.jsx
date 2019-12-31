import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { omdbApiKey } from '../../config/keys';
// import debounce from "lodash.debounce";
const debounce = require("lodash.debounce");

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      searchResults: []
    };

    // this.handleInput = this.handleInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.makeDebouncedSearch = debounce(this.makeDebouncedSearch, 700);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput(e) {
    let keyword = e.currentTarget.value;

    this.setState({keyword});
    console.log(this.state.keyword);

    // 1. make the omdb call to get the final interest the user chose
    if (keyword !== "") {
      this.makeDebouncedSearch(keyword);
    }
  };

  makeDebouncedSearch(keyword) {
    const instance = axios.create();
    instance.defaults.headers.common = {};
    instance.defaults.headers.common.accept = 'application/json';

    instance
      .get(`http://www.omdbapi.com/?s=${keyword}&apikey=${omdbApiKey}`)
      .then(response => {
        let searchResults = response.data["Search"];
        if (searchResults !== null) {
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
  handleClick(e) {
    
    
  }

  render() {
    console.log(this.state.searchResults);

    let results = this.state.searchResults.map((result, idx) => {
      return <li onClick={this.handleClick} key={idx}> {result.Title} </li>
    });

    return(
      <div className='search-container'>
        <input
          type="text"
          placeholder="Search..."
          className='search-input'
          onChange={this.handleInput}
          autoFocus/>
        <div>
          <ul className="search-results">
            {results}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Search);