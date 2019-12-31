import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Modal from './modal/modal';
import Splash from './splash/splash';
import Home from './home/home';

const App = () => (
  <div>
    <Modal />
    
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <ProtectedRoute exact path="/home" component={Home} />
    </Switch>
  </div>
);

export default App;