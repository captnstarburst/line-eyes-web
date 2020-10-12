import React from 'react'
import AppBar from '../UI/AppBar'
import Editor from './Editor'
import { withAuthorization } from '../Session';

const PhotoPage = props => {
    return(
        <>
            <AppBar />
            <Editor />
        </>
        
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PhotoPage);
