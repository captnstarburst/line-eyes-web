import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  flexCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  signUpField : {
    width: '50%',
    alignSelf: 'center'
  }
}))

const SignUpDialog = props => {
  const classes = useStyles()

  return (
    <Dialog
      open={props.mounted}
      onClose={props.toggleSignUp}
      aria-labelledby='form-dialog-title'
      fullWidth="md"
      maxWidth="md"
      
    >
      <DialogTitle id='form-dialog-title' style={{textAlign:'center'}}>Line-Eyes</DialogTitle>
      <DialogContent className={classes.flexCol}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={props.toggleSignUp} color='primary'>
          Cancel
        </Button>
        <Button onClick={props.toggleSignUp} color='primary'>
          next
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SignUpDialog
