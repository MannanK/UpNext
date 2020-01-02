import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSliderItem from './simple_slider_item';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };
    
    const interests = Object.values(this.props.items);

    const sliderItems = interests.map((item, index) => {
      return(
        <SimpleSliderItem interest={interest} key={index}/>
      );
    });

    debugger

    return (
      <div className='slider-container'>
        <Slider {...settings}>
          {sliderItems}
        </Slider>
      </div>
    );
  }
}