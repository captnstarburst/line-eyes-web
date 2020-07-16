import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import EmailValidator from '../../../functions/EmailValidator'


const useStyles = makeStyles(theme => ({
  signUpField: {
    width: '50%',
    alignSelf: 'center',
    marginTop: '20px'
  }
}))

const SignUpForm = props => {
  const classes = useStyles()
  const now = new Date();
  
  const defaultDate = (now.getFullYear() - 18 + "-0" + Number( now.getMonth() + 1) + "-" + now.getDate())

  const handleChange = e => {
    // alert(e.currentTarget.id);
    switch(e.currentTarget.id){
      case "email":
        if(EmailValidator(e.target.value)){
          //validatedEmail
        }else{
          //Email not Validated
        }
        break;
      case "username":
        break;
      case "password":
        break;
      case "password_check":
        break;
      case "date":
        alert(e.target.value)
        break;
      default:
        break;
    }
  }


  return (
    <>
      <TextField
        autoFocus
        margin='dense'
        id='email'
        label='Email Address'
        type='email'
        className={classes.signUpField}
        onChange={handleChange}
      />
      <TextField
        margin='dense'
        id='username'
        label='User Name'
        type='text'
        className={classes.signUpField}
        onChange={handleChange}
      />
      <TextField
        margin='dense'
        id='password'
        label='Password'
        type='password'
        className={classes.signUpField}
        onChange={handleChange}
      />
      <TextField
        margin='dense'
        id='password_check'
        label='Password Check'
        type='password'
        className={classes.signUpField}
        onChange={handleChange}
      />
      <TextField
        id='date'
        label='Date Of Birth'
        type='date'
        defaultValue={defaultDate}
        className={classes.signUpField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange}
      />
    </>
  )
}

export default SignUpForm
