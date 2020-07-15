import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      background: 'white',
      borderRadius: '1%'
    }
  }
}))

const LogIn = props => {
  const classes = useStyles()

  return (
    <>
      <form className={classes.root} noValidate autoComplete='on'>
        <TextField autoFocus id='filled-basic' label='User Name' variant='filled' />
        <TextField
          id='filled-basic'
          label='Password'
          variant='filled'
          type='password'
          autoComplete='current-password'
        />
      </form>
      <Button color='inherit'>Log In</Button>
    </>
  )
}

export default LogIn
