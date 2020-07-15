import React from 'react';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    signUpField : {
      width: '50%',
      alignSelf: 'center'
    }
  }));

const SignUpOne = props => {
    const classes = useStyles()

    return(
        <>
            <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Email Address'
                type='email'
                className={classes.signUpField}
            />
            <TextField
                margin='dense'
                id='password'
                label='Password'
                type='password'
                className={classes.signUpField}
            />
        </>
        
    )
}

export default SignUpOne