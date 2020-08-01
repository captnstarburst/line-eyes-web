import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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

export default function BasicTextFields () {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='on'>
      <TextField
        variant='outlined'
        id='username'
        label='User Name or Email'
        type='text'
      />
      <TextField
        variant='outlined'
        id='password'
        label='Password'
        type='password'
      />

      <Button
        variant='contained'
        color='primary'
        endIcon={<AccountCircleIcon />}
        style={{ width: '95%' }}
      >
        Log In
      </Button>
    </form>
  )
}
