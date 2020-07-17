import React, {useState, useEffect} from 'react'
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
  const classes = useStyles();
  const now = new Date();
  const minimumDate = (now.getFullYear() - 13 + "-0" + Number( now.getMonth() + 1) + "-" + now.getDate())

  const [passwordInput, setPasswordInput] = useState({password: "", password_check: ""});
  const [emailError, setEmailError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(()=> {
    if(passwordInput.password === passwordInput.password_check){
      props.propagateValidatedInfo({id: "password", value: passwordInput.password});
      setPasswordError(false);
    }else{
      props.propagateValidatedInfo({id: "password", value: ""});
      setPasswordError(true);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordInput.password, passwordInput.password_check])

  const handleChange = e => {
    switch(e.currentTarget.id){
      case "email":
        if(EmailValidator(e.target.value)){
          props.propagateValidatedInfo({id: e.currentTarget.id, value:e.target.value});
          setEmailError(false);
        }else{
          props.propagateValidatedInfo({id: e.currentTarget.id, value:""});
          setEmailError(true);
        }
        break;
      case "username":
        props.propagateValidatedInfo({id: e.currentTarget.id, value:e.target.value});
        break;
      case "password":
      case "password_check":
        setPasswordInput(prevState => ({...prevState, [e.currentTarget.id] : e.currentTarget.value}));
        break;
      case "dateOfBirth":
        if(e.target.value > minimumDate){
          props.propagateValidatedInfo({id: e.currentTarget.id, value: ""});
          setDateError(true)
        }else{
          props.propagateValidatedInfo({id: e.currentTarget.id, value:e.target.value});
          setDateError(false)
        }
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
        error={emailError}
        helperText={emailError ? "Please enter a valid email address" : null }
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
        error={passwordError}
        helperText={passwordError ? "Passwords do not match" : null }
      />
      <TextField
        margin='dense'
        id='password_check'
        label='Password Check'
        type='password'
        className={classes.signUpField}
        onChange={handleChange}
        error={passwordError}
        helperText={passwordError ? "Passwords do not match" : null }
      />
      <TextField
        id='dateOfBirth'
        label='Date Of Birth'
        type='date'
        defaultValue={props.defaultDate}
        className={classes.signUpField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange}
        error={dateError}
        helperText={dateError ? "You must be at least 13 years of age" : null }
      />
    </>
  )
}

export default React.memo(SignUpForm);
