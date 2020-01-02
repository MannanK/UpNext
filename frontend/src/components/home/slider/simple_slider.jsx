import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSliderItem from './simple_slider_item';

export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.setState({
      width: document.body.clientWidth,
      height: document.body.clientHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }


  render() {
    const interests = Object.values(this.props.items);

    const sliderItems = interests.map((interest, index) => {
      return(
        <SimpleSliderItem interest={interest} key={index}/>
      );
    });

    let aspectRatio = this.state.width / this.state.height;
    // *7 enables aspect ratio to relate to number of slides
    let numSlides = Math.floor(aspectRatio * 7);

    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: numSlides,
      slidesToScroll: numSlides,
    };

    return (
      <div className='slider-container'>
        <Slider {...settings}>
          {sliderItems}
        </Slider>
      </div>
    );
  }
}