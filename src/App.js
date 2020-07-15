import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from './components/constants/routes';
import SignIn from './components/SignInContainer';

function App() {
  return (
    <Router>
      {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
      <Route path={ROUTES.LOG_IN} component={SignIn} />
      {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
      {/* <Route path={ROUTES.HOME} component={HomePage} /> */}
      {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
      {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
    </Router>
  );
}

export default App;
