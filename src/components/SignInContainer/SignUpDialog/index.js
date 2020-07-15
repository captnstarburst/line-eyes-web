import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import SignUpOne from './SignUpOne'

const useStyles = makeStyles(theme => ({
  flexCol: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const SignUpDialog = props => {
  const classes = useStyles()
  const [signUpPage, setSignPage] = useState(1);

  const incrementPage = () => setSignPage((prevState) => prevState + 1);
  // const decrementPage = () => setSignPage((prevState) => prevState--);

  return (
    <Dialog
      open={props.mounted}
      onClose={props.toggleSignUp}
      aria-labelledby='form-dialog-title'
      fullWidth="sm"
      maxWidth="sm"
      
    >
      <DialogTitle id='form-dialog-title' style={{textAlign:'center'}}>Line-Eyes Sign Up</DialogTitle>
      <DialogContent className={classes.flexCol}>
        {signUpPage === 1 &&  <SignUpOne />}

      </DialogContent>
      <DialogActions>
        <Button onClick={props.toggleSignUp} color='primary'>
          Cancel
        </Button>
        <Button onClick={incrementPage} color='primary'>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SignUpDialog
