import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import SignUpForm from './SignUpForm'

const useStyles = makeStyles(theme => ({
  flexCol: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const SignUpDialog = props => {
  const classes = useStyles()
  const now = new Date();
  const defaultDate = (now.getFullYear() - 18 + "-0" + Number( now.getMonth() + 1) + "-" + now.getDate())

  const [signUpPage, setSignPage] = useState(1);
  const [mountSignUpButton, setSignUpButtonMount] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    dateOfBirth: defaultDate,
    termsAcceptance: false
  })

  const incrementPage = () =>{
    setSignPage((prevState) => prevState + 1); 
    setSignUpButtonMount(false);
  } 
  const decrementPage = () => {
    setSignPage((prevState) => prevState - 1);
    setUserInfo(prevState => ({...prevState, termsAcceptance: false}));
  }

  const formValues = validated => {
    console.log(JSON.stringify(validated))
    setUserInfo(prevState => ({...prevState, [validated.id]: validated.value}));
  }

  const createUser = () => {
    props.firebase.doCreateUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((user) => {
        console.log(JSON.stringify(user));
      })
      .catch(function(error) {
        console.log(JSON.stringify(error))
      });
  }

  useEffect(() => {
    if(userInfo.email !== "" && userInfo.username !== "" && userInfo.password !== "" && userInfo.dateOfBirth !== ""){
      setSignUpButtonMount(true);
    }else if(userInfo.termsAcceptance){
      setSignUpButtonMount(true);
    }else{
      setSignUpButtonMount(false);
    }
  }, [userInfo]);

  return (
    <Dialog
      open={props.mounted}
      onClose={props.toggleSignUp}
      aria-labelledby='form-dialog-title'
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id='form-dialog-title' style={{textAlign:'center'}}>
        Line-Eyes 
        {signUpPage > 1 ?
          " Confirm Info"
          :
          " Sign Up"
        }
        
      </DialogTitle>
      <DialogContent className={classes.flexCol}>
        {signUpPage === 1 &&  
          <SignUpForm 
            validation = {false}
            propagateValidatedInfo = {formValues} 
            defaultDate={defaultDate} 
          />
        }

        {signUpPage > 1 &&
          <SignUpForm 
            validation = {true}
            email = {userInfo.email}
            username = {userInfo.username}
            password = {userInfo.password}
            dateOfBirth = {userInfo.dateOfBirth}
            termsAcceptance = {userInfo.termsAcceptance} 
            propagateValidatedInfo = {formValues}
            
          />
        }
      </DialogContent>
      <DialogActions style={{display: 'flex'}}>
        <div style={{marginRight: 'auto'}}>
        {signUpPage > 1 ? 
            <Button onClick={decrementPage} color='primary'>
              Go Back
            </Button>
            :
            <Button onClick={props.toggleSignUp} color='primary'>
              Cancel
            </Button>
          }
        </div> 
          
        {mountSignUpButton && 
          <Button onClick={signUpPage > 1 ?  createUser : incrementPage} color='primary'>
            Sign Up
          </Button>
        }
        
      </DialogActions>
    </Dialog>
  )
}

export default SignUpDialog
