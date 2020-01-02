import React from "react";
import { connect } from "react-redux";
import { createInterest, deleteInterest } from "../../actions/interest_actions";


class Details extends React.Component {
  constructor(props) {
    super(props);

    this.addInterest = this.addInterest.bind(this);
    this.removeFromInterests = this.removeFromInterests.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleRuntime = this.handleRuntime.bind(this);
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
    
    this.props.deleteInterest( this.props.detailsId );
    this.props.closeModal();
  }

  handleDate(date) {
    let dateArr = date.split("-");
    return `${dateArr[2]} ${this.months[dateArr[1] - 1]} ${dateArr[0]}`;
  }

  handleRuntime(time) {
    let hour = Math.floor(time / 60);
    let minute = time % 60;

    return (hour === 0) ? `${minute} min` :
           (minute === 0) ? `${hour} hr` :
           (hour > 0 && minute > 0) ? `${hour} hr ${minute} min` :
           "";
  }

  render() {
    const detailsItem = this.props.detailsItem || {};

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
        <div className="detail-heading">
          <h3 className="detail-title">{detailsItem.title}</h3>
        </div>

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

              {/* <div className="year-time"> */}
              <span className="year">
                {this.handleDate(detailsItem.year)}
              </span>
              <span className="runtime">
                {this.handleRuntime(detailsItem.runtime)}
              </span>
              {/* </div> */}

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
  deleteInterest: data => dispatch(deleteInterest(data))
});

export default connect(msp, mdp)(Details);