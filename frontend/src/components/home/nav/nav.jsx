import React from 'react';
import { connect } from 'react-redux';

class Nav extends React.Component {

  render() {
    return(
      <nav className='nav-container'>
        <header>
          Nav header
        </header>

        <div>
          Search component
        </div>
      </nav>
    );
  }
}

export default connect(null, null)(Nav);