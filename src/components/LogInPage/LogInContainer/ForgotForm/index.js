import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email';
import { withFirebase } from '../../../Firebase';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
      display: 'flex',
      flexDirection: 'column'
    }
  }
}))

const ForgotForm = props => {

  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='on'>
      <TextField
        variant='outlined'
        id='username'
        label='User Name or Email'
        type='text'
      />

      <Button
        variant='contained'
        color='primary'
        endIcon={<EmailIcon />}
        style={{ width: '95%' }}
      >
        Reset Password
      </Button>
    </form>
  )
}

export default withFirebase(ForgotForm)
