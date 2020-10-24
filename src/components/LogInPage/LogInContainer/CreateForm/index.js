import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailValidator from '../../../functions/EmailValidator'
import { withFirebase } from '../../../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { compose } from 'recompose';

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

const CreateForm = props => {
  const classes = useStyles()
  const now = new Date();
  const minimumDate = (now.getFullYear() - 13 + "-0" + Number( now.getMonth() + 1) + "-" + now.getDate())
  const defaultDate = (now.getFullYear() - 18 + "-0" + Number( now.getMonth() + 1) + "-" + now.getDate())

  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    password_check: "",
    dateOfBirth: defaultDate,
  })

  const [formError, setFormError] = useState({
    email: false,
    username:false,
    password:false,
    dateOfBirth: false,
  })

  const [checkingValues, setCheckingValues] = useState(false);

  const handleChange = e => {
    e.persist();
    setUserInfo(prevState => ({...prevState, [e.target.id]: e.target.value}));
	setCheckingValues(false);
  }

  useEffect(() => {
    if(!EmailValidator(userInfo.email)){
      setFormError(prevState => ({...prevState, email: true}));
    }else{
      setFormError(prevState => ({...prevState, email: false}));
    }

    if(userInfo.username === ""){
      setFormError(prevState => ({...prevState, username: true}));
    }else{
      setFormError(prevState => ({...prevState, username: false}));
    }

    if(userInfo.password !== userInfo.password_check){
      setFormError(prevState => ({...prevState, password: true}));
    }else{
      setFormError(prevState => ({...prevState, password: false}));
    }

    if(userInfo.dateOfBirth > minimumDate){
      setFormError(prevState => ({...prevState, dateOfBirth: true}));
    }else{
      setFormError(prevState => ({...prevState, dateOfBirth: false}));
    }
    
  }, [minimumDate, userInfo])
  
  const handleCreateClick = e => {
    e.preventDefault();
    createUser()
    
    // let check = true;
    // const firestore = props.firebase.getFS();

    // setCheckingValues(true)

    // firestore.collection("Users")
    //   .where("displayName", "==", userInfo.username)
    //   .get()
    //   .then(function(querySnapshot) {
    //     if(!querySnapshot.empty){
    //       setFormError(prevState => ({...prevState, username: true}));
    //       check = false
    //     }
    //   })
    //   .then(() => {
    //     for (const item in formError) {
    //       if(formError[item]){
    //         check = false
    //         return
    //       }
    //     }
    //   })
    //   .then(() => {
    //     if(check){
    //       createUser()
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    //   }); 
  }

  const createUser = () => {
   	const firestore = props.firebase.getFirestore()

	  props.firebase.doCreateUserWithEmailAndPassword(userInfo.email, userInfo.password)
		  .then(async authUser => {
		
			await firestore.collection("Users").doc(authUser.user.uid).set({
				display_name: userInfo.username,
				email: userInfo.email,
				first_name: "",
				joined: props.firebase.timestampFrom(new Date()),
				last_name: "",
				profile_pic: false
			})

			return authUser
    })
    .then(async authUser => {
      await firestore.collection("Birthdays").doc(authUser.user.uid).set({
        birthday:props.firebase.timestampFrom(new Date(userInfo.dateOfBirth))
      })

      return authUser
    })
    .then(async authUser => {
      await firestore.collection("TOS").doc(authUser.user.uid).set({
        acceptance: props.firebase.timestampFrom(new Date()),
        ip: "127.0.0"
      })

      return authUser
    })
    .then(authUser => {
        	props.history.push(ROUTES.LANDING);
      	})
      	.catch(function(error) {
        	console.log(JSON.stringify(error))
        	props.propagateError();
      });
  }


  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        variant='outlined'
        id='email'
        label='Email'
        type='email'
        onChange={handleChange}
        error={checkingValues && formError.email}
        helperText={checkingValues && formError.email ? "check email for validity" : null }
      />
      <TextField
        variant='outlined'
        id='username'
        label='User Name'
        type='text'
        onChange={handleChange}
        error={checkingValues && formError.username}
        helperText={checkingValues && formError.username ? "username already exists" : null }
      />
      <TextField
        variant='outlined'
        id='password'
        label='Password'
        type='password'
        onChange={handleChange}
        error={checkingValues && formError.password}
        helperText={checkingValues && formError.password ? "passwords do not match" : null }
      />
      <TextField
        variant='outlined'
        id='password_check'
        label='Password Check'
        type='password'
        onChange={handleChange}
        error={checkingValues && formError.password}
        helperText={checkingValues && formError.password ? "passwords do not match" : null }
      />
      <TextField
        variant='outlined'
        id='dateOfBirth'
        label='Date Of Birth'
        type='date'
        InputLabelProps={{
          shrink: true
        }}
        defaultValue={defaultDate}
        onChange={handleChange}
        error={checkingValues && formError.dateOfBirth}
        helperText={checkingValues && formError.dateOfBirth ? "You must be at least 13 years of age" : null }
      />

      <Button
        variant='contained'
        color='primary'
        endIcon={<AccountCircleIcon />}
        style={{ width: '95%' }}
        onClick={handleCreateClick}
      >
        Create Account
      </Button>
    </form>
  )
}

const ComposedCreateForm = compose(
  withRouter,
  withFirebase,
)(CreateForm);

export default ComposedCreateForm
