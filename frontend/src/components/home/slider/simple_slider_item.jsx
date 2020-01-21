import React from 'react';
import { connect } from 'react-redux';
import { openModal } from "../../../actions/modal_actions";

class SimpleSliderItem extends React.Component {
  render() {
    const { entry, type } = this.props;
    let modal;

    if (type === 'interests') {
      modal = {
        type: "details",
        detailsType: type,
        detailsId: entry._id
      };
    } else if (type === 'recommendations') {
      modal = {
        type: "details",
        detailsType: type,
        detailsId: entry._id
      };
    }

    return(
      <div className="slider-item">
        {/* <h1>{entry.title}</h1> */}
        <img
          className='slider-image'
          src={`https://image.tmdb.org/t/p/w500/${entry.poster}`} alt={`${entry.title}`}
          onClick={() => this.props.openModal(modal)} />
      </div>
    );
  }
}

const mdp = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mdp)(SimpleSliderItem);