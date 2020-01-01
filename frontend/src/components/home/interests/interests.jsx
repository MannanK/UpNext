import React from 'react';
import { connect } from 'react-redux';
import SimpleSlider from '../slider/simple_slider';

class Interests extends React.Component {

  render() {
    return (
      <div className="interests-container">
        <header className='interests-header'>Your interests</header>
        <SimpleSlider />
      </div>
    );
  }
}

export default connect(null, null)(Interests);