import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    bottomLinks: {
      textAlign: "center",  
      '& > * + *': {
        marginLeft: theme.spacing(20),
      },
    },
}));

const Footer = () => {
    const preventDefault = (event) => event.preventDefault();
    const classes = useStyles();

    return(
        <footer style={{ background: '#272C34'}}>
            <Typography 
                style={{color: 'white', textAlign: 'center', fontSize: '16px' }}
                variant='h6'
            >
                Line-Eyes &copy;
            </Typography>
            <Typography className={classes.bottomLinks}>
                <Link href="#" color="primary" onClick={preventDefault}>
                    Privacy Policy
                </Link>
                <Link href="#" color="primary" onClick={preventDefault}>
                    Terms & Conditions
                </Link>                
            </Typography>
        </footer>
    );
}

export default Footer;
