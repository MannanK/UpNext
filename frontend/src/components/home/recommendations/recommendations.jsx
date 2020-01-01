import React from 'react';
import { connect } from 'react-redux';

class Recommendations extends React.Component {

  render() {
    return (
      <div className='recommendations-container'>
        These are your recs
      </div>
    );
  }
}

export default connect(null, null)(Recommendations);