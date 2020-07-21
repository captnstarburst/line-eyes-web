import React, {useState} from 'react'
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

  const [userInfo, setUserInfo] = useState({email: "", password: ""})

  const handleChange = e => {
    setUserInfo(prevState => ({...prevState, [e.target.id] : e.target.value}));
  }

  const onClickLogIn = () => {
    props.firebase.doSignInWithEmailAndPassword(userInfo.email, userInfo.password)
  } 

  return (
    <>
      <form className={classes.root} noValidate autoComplete='on'>
        <TextField autoFocus id='email' label='Email' variant='filled' onChange={handleChange}/>
        <TextField
          onChange={handleChange}
          id='password'
          label='Password'
          variant='filled'
          type='password'
          autoComplete='current-password'
        />
      </form>
      <Button color='inherit' onClick={onClickLogIn}>Log In</Button>
    </>
  )
}

export default LogIn
