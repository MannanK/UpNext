import React from 'react';
import { connect } from 'react-redux';
import { fetchGenres } from '../../actions/genre_actions';
import Nav from './nav/nav';
import Interests from './interests/interests';
import Recommendations from './recommendations/recommendations';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchGenres();
  }

  render() {
    return(
      <main className='home-main'>
        <Nav />
        <Interests />
        <Recommendations type="similar"/>
        <Recommendations type="similar"/>
      </main>
    )
  }
}

const mdp = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres())
});

export default connect(null, mdp)(Home);