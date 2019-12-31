import React from 'react';
import { connect } from 'react-redux';

class Recommendations extends React.Component {

  render() {
    return (
      <div className='recommendations-container'>
        This is the recs gangagnagn
      </div>
    );
  }
}

export default connect(null, null)(Recommendations);