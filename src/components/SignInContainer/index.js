import React from 'react';
import  { FirebaseContext } from '../Firebase';
import SignInBar from './SignInBar';

const SignInContainer = () => {
    return(
        <FirebaseContext.Consumer>
            {firebase => {
                return <SignInBar firebase = {firebase}/>
            }}
        </FirebaseContext.Consumer>
    )
}

export default SignInContainer;