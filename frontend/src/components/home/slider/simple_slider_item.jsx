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
      <div className="slider-item"
        onClick={() => this.props.openModal(modal)}>
        <header className='slider-item-header'>this is a valiue rn</header>
        <img
          className='slider-item-image'
          src={require("../../../assets/images/shrek2.jpg")} alt="logo" />
      </div>
    );
  }
}

const mdp = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mdp)(SimpleSliderItem);