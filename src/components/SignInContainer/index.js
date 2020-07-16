import React, { useState } from 'react'
import { FirebaseContext } from '../Firebase'
import SignInBar from './SignInBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import PregnancyTest from '../assets/pregnancy-test.png'
import SignUpDialog from './SignUpDialog'
import Footer from '../UI/Footer'

const SignInContainer = () => {
  const [mountSignUp, setMountSignUp] = useState(false)

  const toggleSignUp = () => setMountSignUp(prevState => !prevState)

  return (
    <>
      <FirebaseContext.Consumer>
        {firebase => {
          return <SignInBar firebase={firebase} signUpToggle={toggleSignUp} />
        }}
      </FirebaseContext.Consumer>
      <CssBaseline />
      <Container
        maxWidth='xl'
        disableGutters={true}
        style={{ backgroundColor: '#272C34', height: '100vh' }}
      >
        {mountSignUp && (
          <SignUpDialog mounted={mountSignUp} toggleSignUp={toggleSignUp} />
        )}

        <Typography
          variant='h1'
          component='h1'
          style={{ color: 'white', textAlign: 'center', paddingTop: '20vh' }}
        >
          Line
        </Typography>

        <img
          src={PregnancyTest}
          alt='Pregnancy Test'
          style={{ display: 'block', margin: 'auto' }}
        />

        <Typography
          variant='h1'
          component='h1'
          style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}
        >
          Eyes
        </Typography>
      </Container>
      <Footer />
    </>
  )
}

export default SignInContainer
