import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

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

  // alert(defaultDate)
  console.log(defaultDate)

  return (
    <>
      <TextField
        autoFocus
        margin='dense'
        id='email'
        label='Email Address'
        type='email'
        className={classes.signUpField}
        onChange={props.propagateChange}
      />
      <TextField
        margin='dense'
        id='username'
        label='User Name'
        type='text'
        className={classes.signUpField}
        onChange={props.propagateChange}
      />
      <TextField
        margin='dense'
        id='password'
        label='Password'
        type='password'
        className={classes.signUpField}
        onChange={props.propagateChange}
      />
      <TextField
        margin='dense'
        id='password_check'
        label='Password Check'
        type='password'
        className={classes.signUpField}
        onChange={props.propagateChange}
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
        onChange={props.propagateChange}
      />
    </>
  )
}

export default SignUpForm
