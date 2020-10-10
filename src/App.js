import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './components/constants/routes';
import LogInPage from './components/LogInPage'
import LandingPage from './components/LandingPage'
import MyAccountPage from './components/MyAccountPage'
import { withFirebase } from './components/Firebase';
import { withAuthentication } from './components/Session';

const App = () => {
  return (
      <Router> 
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.My_Account} component={MyAccountPage} />
          <Route path={ROUTES.LOG_IN} component={LogInPage} />
          
          {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
          {/* <Route path={ROUTES.HOME} component={HomePage} /> */}
          {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
          {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
        </Router>
  );
}

export default withFirebase(withAuthentication(App));
