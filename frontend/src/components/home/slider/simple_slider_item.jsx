import React from 'react';
import { connect } from 'react-redux';

class SimpleSliderItem extends React.Component {
  render() {
    const { interest } = this.props;


    return(
      <div className="slider-item">
        <header className='slider-item-header'>this is a valiue rn</header>
        <img
          className='slider-item-image'
          src={require("../../../assets/images/shrek2.jpg")} alt="logo" />
      </div>
    );
  }
}

export default connect(null, null)(SimpleSliderItem);