import React from 'react'
import AppBar from '../UI/AppBar'
import CenteredTabs from './Navigation'
// import Stats from './Stats'
import Profile from './Profile'
import { withAuthorization } from '../Session';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const MyAccountPage = props => {
    return(
        <>
            <AppBar />
            
            <CssBaseline />
            <Container fixed>
                <Profile />
                <CenteredTabs />
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </>
        
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MyAccountPage);
