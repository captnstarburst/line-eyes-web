import React from 'react'
import AppBar from '../UI/AppBar'
import { withAuthorization } from '../Session';

const PhotoPage = props => {
    return(
        <>
            <AppBar />
            <h1>Photo</h1>
        </>
        
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PhotoPage);
