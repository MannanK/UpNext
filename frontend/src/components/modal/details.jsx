import React from "react";
import { connect } from "react-redux";
import { createInterest, deleteInterest } from "../../actions/interest_actions";


class Details extends React.Component {
  constructor(props) {
    super(props);

    this.addInterest = this.addInterest.bind(this);
    this.removeFromInterests = this.removeFromInterests.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.months = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
  }

  addInterest(e) {
    e.preventDefault();
    this.props.createInterest(this.props.detailsItem);
    this.props.closeModal();
  }

  removeFromInterests(e) {
    e.preventDefault();
    this.props.deleteInterest(this.props.detailsItem._id);
    this.props.closeModal();
  }

  handleDate(date) {
    let dateArr = date.split("-");
    return `${dateArr[2]} ${this.months[dateArr[1] - 1]} ${dateArr[0]}`;
  }

  render() {
    const detailsItem = this.props.detailsItem || {};

    // let score = {
    //   width: `${(detailsItem.voteAverage / 10) * 100}%`
    // };

    ///RENDER BUTTONS
    let button = (this.props.detailsType === "recommendations") ? (
      <button className="interest-button" onClick={this.addInterest}>
        Add to Interests
      </button>
    ) : (
      <button className="interest-button" onClick={this.removeFromInterests}>
        Remove from Interests
      </button>
    )

    let genres = detailsItem.genres.slice(0,3).map((genre) => genre.name);

    

    return (
      <>
        {/* <h3 className="detail-title">The Lord of the Rings: The Return of the King</h3> */}
        <h3 className="detail-title">{detailsItem.title}</h3>
        <section className="detail-container">
          <section className="top-half">
            <div className="poster">
              <img
                src={`https://image.tmdb.org/t/p/w500/${detailsItem.poster}`}
                alt="poster"
              />
            </div>

            <div className="runtime-scores">

              <div className="ratings-container">
                {/* <div className="score">
                  <span className="stars" style={score}>
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
                </div> */}
                <div className="star">
                  <i className="fas fa-star"></i>
                </div>

                <div className="score-votes">
                  <span className="score-num">
                    {detailsItem.voteAverage}
                    <span>/10</span>
                  </span>
                  <span className="vote-count">{`${detailsItem.voteCount} votes`}</span>
                </div>
              </div>

              <div className="year-time">
                <span>{this.handleDate(detailsItem.year)}</span>
                <span>{`${detailsItem.runtime} min`}</span>
              </div>

              <div className="genres">
                <span>{genres.join(", ")}</span>
              </div>

            </div>
          </section>



          <div className="overview">{detailsItem.overview}</div>

          {button}
        </section>
      </>
    );
  }
  
}


const msp = (state, ownProps) => {
  let detailsItem = state.entities[ownProps.detailsType][ownProps.detailsId];

  return {
    detailsItem
  }
}

const mdp = dispatch => ({
  createInterest: data => dispatch(createInterest(data)),
  deleteInterest: dataId => dispatch(deleteInterest(dataId))
});

export default connect(msp, mdp)(Details);