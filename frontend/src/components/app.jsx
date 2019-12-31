import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import Modal from './modal/modal';

import Splash from './splash/splash';

// import MainPage from './main/main_page';

const App = () => (
  <div>
    <Modal />
    
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      {/* <AuthRoute exact path="/" component={MainPage} /> */}
    </Switch>
  </div>
);

export default App;