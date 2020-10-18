import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from './components/constants/routes'
import LogInPage from './components/LogInPage'
import LandingPage from './components/LandingPage'
import MyAccountPage from './components/MyAccountPage'
import PhotoPage from './components/PhotoPage'
import PrivacyPage from './components/LegalPage/PrivacyPolicy'
import TermsPage from './components/LegalPage/TermsConditions'
import { withFirebase } from './components/Firebase'
import { withAuthentication } from './components/Session'

const App = () => {
  return (
    <Router>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.My_Account} component={MyAccountPage} />
      <Route path={ROUTES.PHOTO} component={PhotoPage} />
      <Route path={ROUTES.LOG_IN} component={LogInPage} />
      <Route exact path={ROUTES.PRIVACY} component={PrivacyPage} />
      <Route exact path={ROUTES.TERMS} component={TermsPage} />
      {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
    </Router>
  )
}

export default withFirebase(withAuthentication(App))
