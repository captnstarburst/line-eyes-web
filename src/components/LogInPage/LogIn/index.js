import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PregnancyTest from '../../assets/pregnancy-test.png'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'

const useStyles = makeStyles(theme => ({
  SignUpButton : {
    width: '65%',
    marginBottom: '5%'
  }
}))


const LogIn = props => {
  const classes = useStyles();

  return (
    <section>
      <Button color="primary" style={{marginLeft: '75%', marginBottom: '10%'}} 
        endIcon={<ArrowRightAltIcon />}
      >Log In </Button>
      <Typography
        align='center'
        color='primary'
        variant='h3'
        component='h1'
        style={{ fontFamily: 'Red Rose, cursive' }}
      >
        Line - Eyes
      </Typography>

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img
          src={PregnancyTest}
          alt='Line - Eyez App'
          style={{ width: '50%', marginBottom: '50px' }}
        />


        <Button variant="contained"   className={classes.SignUpButton} style={{color:'#4267B2' }}
          endIcon={<FontAwesomeIcon icon={faFacebook} />}
        >
          Sign up with Facebook 
        </Button>
        <Button variant="contained"  className={classes.SignUpButton} style={{color: "#0F9D58"}}
          endIcon={<FontAwesomeIcon icon={faGoogle} />}
        >
          Sign up with Google
        </Button>
        <Button variant="contained"  className={classes.SignUpButton} style={{color: "#1da1f2"}}
          endIcon={<FontAwesomeIcon icon={faTwitter} />}
        >
          Sign up with Twitter
        </Button>

        <Typography
        align='center'
        color='primary'
        variant='p'
        component='p'
        style={{ fontFamily: 'Red Rose, cursive', display: 'flex' }}
        >
        or  
        </Typography>
        


        <Button color="primary" >
        Create Account </Button>
        {/* <LogInForm /> */}
      </div>

      
    </section>
  )
}

export default LogIn
