import React from "react";
import { connect } from "react-redux";
import { createInterest, deleteInterest } from "../../actions/interest_actions";


class Details extends React.Component {
  constructor(props) {
    super(props);

    this.addInterest = this.addInterest.bind(this);
  }

  addInterest(e) {
    e.preventDefault();

    this.props.createInterest(this.props.detailsItem);

  }

  // removeFromInterests(e) {

  // }


  render() {
    const detailsItem = this.props.detailsItem || {};

    // let score = {
    //   width: `${(detailsItem.voteAverage / 10) * 100}%`
    // };

    return (
      <section className="detail-container">

        <div className="poster">
          {/* <img src="" alt="poster"/> */}
        </div>

        {/* <h3>{detailsItem.title}</h3> */}
        <h3 className="detail-title">The Lord of the Rings: The Return of the King</h3>

        <div className="runtime-scores">

          {/* <span>{detailsItem.year}</span>
          <span>{detailsItem.runtime}</span> */}

          <div className="score">
            {/* <span className="stars" style={score}> */}
            <span className="stars" >
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
          </div>

          <div className="vote-count">
            {/* {detailsItem.voteCount} */}
          </div>

        </div>

        <div className="overview">
          {/* {detailsItem.overview} */}
        </div>

        <button className="add-interest" 
          onClick={this.addInterest}>
            Add to Interests
        </button>

      </section>
    );
  }
  
}


// const msp = (state, ownProps) => {
//   let detailsItem = state.entities[ownProps.detailsType][ownProps.detailsId];

//   return {
//     detailsItem
//   }
// }
const mdp = dispatch => ({
  createInterest: data => dispatch(createInterest(data)),
  deleteInterest: dataId => dispatch(deleteInterest(dataId))
});

export default connect(null, mdp)(Details);