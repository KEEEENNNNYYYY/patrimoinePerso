import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './page/Login/login';
import Dashboard from './page/Dashboard/Dashboard';
import Profil from './page/Profil/profil'
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profil" component={Profil} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
