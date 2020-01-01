import React from 'react';
import { connect } from 'react-redux';
import SimpleSlider from './simpleslider';

class Interests extends React.Component {

  render() {
    return (
      <div className="interests-container">
        <span>This is the intesrsts323</span>
        <SimpleSlider />
      </div>
    );
  }
}

export default connect(null, null)(Interests);