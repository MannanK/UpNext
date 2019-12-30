import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';

// import MainPage from './main/main_page';

const App = () => (
  <Switch>
    <Route exact path="/" component={Splash} />
    {/* <AuthRoute exact path="/" component={MainPage} /> */}
  </Switch>
);

export default App;