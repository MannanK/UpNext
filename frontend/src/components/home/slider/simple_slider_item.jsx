import React from 'react';
import { connect } from 'react-redux';
import { openModal } from "../../../actions/modal_actions";

class SimpleSliderItem extends React.Component {
  

  render() {
    let modal = {
      type: "details",
      detailsType: "interests",
      detailsId: "5e0e23dbc3a1c51dce1c4ad9"
    };
    
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