import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PregnancyTest from '../../assets/pregnancy-test.png'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProviderSignUp from './ProviderSignUp'
import LogInForm from './LogInForm'

const LogInContainer = props => {
  const [currentFormMounted, setCurrentForm] = useState("provider");


  const handleLogInClick = () => {
    setCurrentForm("login")
  }

  const handleBackClick = () => {
    setCurrentForm("provider")
  }

  return (
    <section>

      {currentFormMounted === "provider" ? 
      
      <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
        <Button color='primary' onClick={handleLogInClick} endIcon={<ArrowRightAltIcon />}>
          Log In{' '}
        </Button>
      </div>
      :
      <Button color='primary' onClick={handleBackClick} startIcon={<ArrowBackIcon />}>
        Go Back
      </Button>
      }
      

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

        {currentFormMounted === "provider" && 
          <ProviderSignUp />
        }
        
        {currentFormMounted === "login" &&
          <LogInForm />
        }


      </div>
    </section>
  )
}

export default LogInContainer
