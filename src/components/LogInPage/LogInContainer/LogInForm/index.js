import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
      flexDirection: 'column'
    }
  },
  hrText: {
    lineHeight: '1em',
    position: 'relative',
    outline: '0',
    border: '0',
    color: 'black',
    textAlign: 'center',
    height: '1.5em',
    opacity: '.5',

    '&::before': {
        content: '',
        background: 'linear-gradient(to right, transparent, #818078, transparent)',
        position: 'absolute',
        left: '0',
        top: '50%',
        width: '100%',
        height: '1px'
    },
    '&::after': {
        content: 'attr(data-content)',
        position: 'relative',
        display: 'inline-block',
        color: 'black',
        padding: '0 .5em',
        lineHeight: '1.5em',
        color: '#818078',
        backgroundColor: '#fcfcfa'
    }
  }
}))

export default function BasicTextFields () {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='off'>
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
