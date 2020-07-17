import React, {useState, useCallback} from 'react'
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
  const propagateValidatedInfo = props.propagateValidatedInfo
  const [passwordInput, setPasswordInput] = useState({password: "", password_check: ""});


  const passwordVerification = useCallback(
    () => {
      if(passwordInput.password === passwordInput.password_check){
        propagateValidatedInfo({id: "password", value: passwordInput.password});
      }else{
        propagateValidatedInfo({id: "password", value: ""});
      }
    },
    [passwordInput.password, passwordInput.password_check, propagateValidatedInfo],
  )

  const handleChange = e => {
    // alert(e.currentTarget.id);
    switch(e.currentTarget.id){
      case "email":
        if(EmailValidator(e.target.value)){
          props.propagateValidatedInfo({id: e.currentTarget.id, value:e.target.value});
        }else{
          props.propagateValidatedInfo({id: e.currentTarget.id, value:""});
        }
        break;
      case "username":
        props.propagateValidatedInfo({id: e.currentTarget.id, value:e.target.value});
        break;
      case "password":
      case "password_check":
        setPasswordInput(prevState => ({...prevState, [e.currentTarget.id] : e.currentTarget.value}));
        passwordVerification();
        break;
      case "dateOfBirth":
        props.propagateValidatedInfo({id: e.currentTarget.id, value:e.target.value});
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
        id='dateOfBirth'
        label='Date Of Birth'
        type='date'
        defaultValue={props.defaultDate}
        className={classes.signUpField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange}
      />
    </>
  )
}

export default React.memo(SignUpForm);
