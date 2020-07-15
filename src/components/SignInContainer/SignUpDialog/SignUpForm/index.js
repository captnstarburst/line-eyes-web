// import 'date-fns';
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
// import DateFnsUtils from '@date-io/date-fns';
// import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  signUpField: {
    width: '50%',
    alignSelf: 'center',
    marginTop: '15px'
  }
}))

const SignUpForm = props => {
  const classes = useStyles()

  return (
    <>
      <TextField
        autoFocus
        margin='dense'
        id='name'
        label='Email Address'
        type='email'
        className={classes.signUpField}
      />
      <TextField
        margin='dense'
        id='username'
        label='User Name'
        type='text'
        className={classes.signUpField}
      />
      <TextField
        margin='dense'
        id='password'
        label='Password'
        type='password'
        className={classes.signUpField}
      />
      <TextField
        margin='dense'
        id='password_check'
        label='Password Check'
        type='password'
        className={classes.signUpField}
      />
      <TextField
        id='date'
        label='Date Of Birth'
        type='date'
        defaultValue='2017-05-24'
        className={classes.signUpField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </>
  )
}

export default SignUpForm
