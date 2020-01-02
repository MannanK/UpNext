import React from 'react';
import { connect } from 'react-redux';
import { openModal } from "../../../actions/modal_actions";

class SimpleSliderItem extends React.Component {
  render() {
    let modal = {
      type: "details",
      detailsType: "interests",
      detailsId: "5e0d1ebafbf0cd1ceb8f11e0"
    };

    const { interest } = this.props;

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