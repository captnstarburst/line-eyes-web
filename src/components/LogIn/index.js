import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const LogIn = props => {

    return(
        <main style={{ background: 'background: rgb(34,193,195)',
            background: 'linear-gradient(4deg, rgba(34,193,195,1) 0%, rgba(0,112,26,1) 100%)',
            height: '100vh' }}>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="h1" style={{height: '50%'}}>
                    Line-Eyes
                </Typography>
            </Container>
        </main>
    );
}

export default LogIn