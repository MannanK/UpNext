import React from 'react';
import { connect } from 'react-redux';

class Search extends React.Component {

  render() {
    return(
      <div className='search-container'>
        <input
          type="text"
          placeholder="Search..."
          className='search-input'
          autoFocus/>
        <div>
          These are the entries
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Search);