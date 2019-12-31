import React from 'react';
import { connect } from 'react-redux';
import Nav from './nav/nav';
import Interests from './interests/interests';
import Recommendations from './recommendations/recommendations';

class Home extends React.Component {

  render() {
    return(
      <main className='home-main'>
        <Nav />
        <Interests />
        <Recommendations />
      </main>
    )
  }
}

const msp = state => {
}

const mdp = dispatch => {
}

export default connect(null, null)(Home);