import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import LogIn from './LogIn'

const useStyles = makeStyles(theme => ({
  root: {
    background:
      'linear-gradient(4deg, rgba(34,193,195,1) 0%, rgba(0,112,26,1) 100%)',
    height: '100vh',
    flexGrow: 1
  },
  logInContainer: {
    height: '50vh',
    marginTop: '10vh',
    width: '35vw'
  }
}))

const LogInPage = props => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}
      xl={12}
    >
      <Paper elevation={24} className={classes.logInContainer} style={{height: '100%'}}>
        <LogIn />
      </Paper>
    </Grid>
  )
}

export default LogInPage
