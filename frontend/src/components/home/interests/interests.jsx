import React from 'react';
import { connect } from 'react-redux';
import SimpleSlider from '../slider/simple_slider';
import { fetchInterests } from '../../../actions/interest_actions';
import { updateGenre } from '../../../actions/genre_actions';

class Interests extends React.Component {
  componentDidMount() {
    this.props.fetchInterests();
  }

  componentDidUpdate(prevProps) {
    // can check if interests have changed
    if (Object.keys(prevProps.interests).length !== Object.keys(this.props.interests).length) {
      const { genres, interests } = this.props;
      Object.values(genres).forEach(genre => {
        // console.log("-----line 16 interests.jsx-----");
        this.props.updateGenre(genres[genre.name]._id, { value: 0, interestCount: Object.keys(interests).length + 1 });
      });
    }
  }

  render() {
    return (
      <div className="interests-container">
        <header className='slider-header'>
          <div className='slider-title'>
            Your Interests
          </div>
        </header>
        <SimpleSlider items={this.props.interests} type={'interests'}/>
      </div>
    );
  }
}

const msp = state => ({
  interests: state.entities.interests,
  genres: state.entities.genres
});

const mdp = dispatch => ({
  fetchInterests: () => dispatch(fetchInterests()),
  updateGenre: (genreId,value) => dispatch(updateGenre(genreId,value)),
});

export default connect(msp, mdp)(Interests);