import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import * as ROUTES from './components/constants/routes';
import SignIn from './components/SignInContainer';

const App = props => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() =>{
    const user = props.firebase.getAuth;

    if(user){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }

  }, [props.firebase]);  
  
  return (
    <Router> 
      {!loggedIn && 
        <Redirect to={ROUTES.LOG_IN} />
      }
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
