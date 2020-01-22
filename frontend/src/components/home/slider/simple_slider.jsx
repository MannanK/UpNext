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
    const { type } = this.props;
    let sliderItems;

    if (type === 'interests') {
      const interests = Object.values(this.props.items).sort((a,b) => {
        if(a.date > b.date) {
          return -1;
        } else if (a.date < b.date){
          return 1;
        }
        return 0;
      });
      
      sliderItems = interests.map((interest, index) => {
        return(
          <SimpleSliderItem entry={interest} key={index} type={type}/>
        );
      });
    } else if (type === 'recommendations') {
      const recommendations = Object.values(this.props.items);

      sliderItems = recommendations.map((recommendation, index) => {
        return (
          <SimpleSliderItem entry={recommendation} key={index} type={type} />
        );
      });
    }



    let aspectRatio = this.state.width / this.state.height;
    // *6.5 enables aspect ratio to relate to number of slides
    let desktopSlides = Math.floor(aspectRatio * 6);
    let mobileSlides = Math.floor(aspectRatio * 7);
    let settings = (window.matchMedia("(max-width: 570px)").matches) ?
      {
        infinite: true,
        speed: 500,
        slidesToShow: mobileSlides,
        swipeToSlide: true,
        arrows: false
      } :
      {
        infinite: false,
        speed: 500,
        variableWidth: true,
        slidesToShow: desktopSlides,
        slidesToScroll: desktopSlides,
        draggable: false,
        arrows: true
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