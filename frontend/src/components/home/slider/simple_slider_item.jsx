import React from 'react';
import { connect } from 'react-redux';
import { openModal } from "../../../actions/modal_actions";

class SimpleSliderItem extends React.Component {
  render() {
    const { interest } = this.props;

    let modal = {
      type: "details",
      detailsType: "interests",
      detailsId: interest._id
    };


    return(
      <div className="slider-item">
        <img
          className='slider-image'
          src={`https://image.tmdb.org/t/p/w500/${interest.poster}`} alt="movie"
          onClick={() => this.props.openModal(modal)} />
      </div>
    );
  }
}

const mdp = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mdp)(SimpleSliderItem);