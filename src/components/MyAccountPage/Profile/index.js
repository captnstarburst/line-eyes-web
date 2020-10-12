import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{display:'flex', justifyContent:"space-between", alignItems:" center", margin: '15px'}} >
                <div style={{display:'flex', alignItems:" center"}}>
                    <Avatar variant="rounded" className={classes.large} style={{alignSelf: "center"}}>
                        <AccountCircle className={classes.large} />
                    </Avatar>
                    <div style={{display:'flex', flexDirection:"column",  alignContent:"center", margin: "10px"}}>
                    <Typography
                        align='center'
                        color='primary'
                        variant='h6'
                        component='h6'
                        
                    >
                        Real Name
                    </Typography>
                    <Typography
                        align='left'
                        color='primary'
                        variant='h6'
                        component='h6'
                        style={{fontSize: "12px"}}
                    >
                        User Name
                    </Typography>
                        
                    </div>
                </div>
                

                <Button variant="outlined" color="primary" style={{height: "40px"}}>
                    Edit Profile
                </Button>

            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
