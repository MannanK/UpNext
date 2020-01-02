import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSliderItem from './simple_slider_item';

export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: document.body.clientWidth
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.setState({
      width: document.body.clientWidth
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

    let numSlides = Math.floor(this.state.width / 150);

    if (window.matchMedia("(max-width: 900px)").matches) {
      numSlides = 4;
    }

    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: numSlides + 0.05,
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