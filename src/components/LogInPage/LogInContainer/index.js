import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PregnancyTest from '../../assets/pregnancy-test.png'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { FirebaseContext } from '../../Firebase'
import ProviderSignUp from './ProviderSignUp'
import LogInForm from './LogInForm'
import CreateForm from './CreateForm'
import Error from './Error'

const LogInContainer = props => {
  const [currentFormMounted, setCurrentForm] = useState('provider')

  const handleLogInClick = () => {
    setCurrentForm('login')
  }

  const handleBackClick = () => {
    setCurrentForm('provider')
  }

  const handleCreateClick = () => {
    setCurrentForm('create')
  }

  const mountError = () => {
    setCurrentForm('error')
  }

  return (
    <section>
      {currentFormMounted === 'provider' ? (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
          <Button
            color='primary'
            onClick={handleLogInClick}
            endIcon={<ArrowRightAltIcon />}
          >
            Log In{' '}
          </Button>
        </div>
      ) : (
        <Button
          color='primary'
          onClick={handleBackClick}
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
      )}

      <Typography
        align='center'
        color='primary'
        variant='h3'
        component='h1'
        style={{ fontFamily: 'Red Rose, cursive' }}
      >
        Line - Eyes
      </Typography>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <img
          src={PregnancyTest}
          alt='Line - Eyez App'
          style={{ width: '50%', marginBottom: '50px' }}
        />

        {currentFormMounted === 'provider' && (
          <ProviderSignUp propagateCreateClick={handleCreateClick} />
        )}

        {currentFormMounted === 'login' && <LogInForm />}

        {currentFormMounted === 'create' && (
          <FirebaseContext.Consumer>
            {firebase => {
              return (
                <CreateForm firebase={firebase} propagateError={mountError} />
              )
            }}
          </FirebaseContext.Consumer>
        )}

        {currentFormMounted === 'error' && <Error />}
      </div>
    </section>
  )
}

export default LogInContainer
