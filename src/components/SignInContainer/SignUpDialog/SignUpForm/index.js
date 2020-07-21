import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    if(!props.password) {
      if(passwordInput.password === passwordInput.password_check){
        props.propagateValidatedInfo({id: "password", value: passwordInput.password});
        setPasswordError(false);
      }else{
        props.propagateValidatedInfo({id: "password", value: ""});
        setPasswordError(true);
      }
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
        e.persist();
        setPasswordInput(prevState => ({...prevState, [e.target.id] : e.target.value}));
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
      case "termsAcceptance":
        props.propagateValidatedInfo({id: e.target.id, value: e.target.checked});
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
        variant= {props.validation ? "filled" : "outlined"}
        defaultValue={props.validation ? props.email : null}
        InputProps={{
          readOnly: props.validation,
        }}
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
        variant= {props.validation ? "filled" : "outlined"}
        defaultValue={props.validation ? props.username : null}
        InputProps={{
          readOnly: props.validation,
        }}
      />
      <TextField
        margin='dense'
        id='password'
        label='Password'
        type='password'
        className={classes.signUpField}
        onChange={handleChange}
        variant= {props.validation ? "filled" : "outlined"}
        defaultValue={props.validation ? props.password : null}
        InputProps={{
          readOnly: props.validation,
        }}
        error={passwordError}
        helperText={passwordError ? "Passwords do not match" : null }
      />
      {!props.validation && 
        <TextField
          margin='dense'
          id='password_check'
          label='Password Check'
          type='password'
          className={classes.signUpField}
          onChange={handleChange}
          variant= {"outlined"}
          error={passwordError}
          helperText={passwordError ? "Passwords do not match" : null }
        />
      }
      
      <TextField
        id='dateOfBirth'
        label='Date Of Birth'
        type='date'
        defaultValue={props.validation ? props.dateOfBirth : props.defaultDate}
        variant= {props.validation ? "filled" : "outlined"}
        className={classes.signUpField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange}
        InputProps={{
          readOnly: props.validation
        }}
        error={dateError}
        helperText={dateError ? "You must be at least 13 years of age" : null }
      />

      {props.validation && 
        <FormControlLabel
        className={classes.signUpField}
          control={
            <Checkbox
              checked={props.termsAcceptance}
              onChange={handleChange}
              name="Agreement"
              id="termsAcceptance"
              color="primary"
            />
          }
          label="I agree to the Terms of Service and Privacy Policy"
        />
      }
    </>
  )
}

export default SignUpForm;
