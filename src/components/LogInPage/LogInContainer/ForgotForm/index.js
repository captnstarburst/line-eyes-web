import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EmailIcon from "@material-ui/icons/Email";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import EmailValidator from "../../../functions/EmailValidator";
import { withFirebase } from "../../../Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const ForgotForm = (props) => {
  const classes = useStyles();

  const [userName, setUserName] = useState("");
  const [errorText, setErrorText] = useState("");
  const [asyncWork, setAsyncWork] = useState(false);
  const [resetStatus, setResetStatus] = useState(false);

  const handleReset = () => {
    if (userName === "") {
      setErrorText("enter a user name or email");
    } else if (EmailValidator(userName)) {
      setAsyncWork(true);
      props.firebase
        .doPasswordReset(userName)
        .then(() => {
          setResetStatus(true);
          setAsyncWork(false);
        })
        .catch((err) => {
          setAsyncWork(false);
          setErrorText("Email is not registered");
        });
    } else {
      setAsyncWork(true);
      const functions = props.firebase.useFunctions();
      const ReturnEmail = functions.httpsCallable("ReturnEmail");

      ReturnEmail({ display_name: userName })
        .then((result) => {
          if (result.data === "") throw new Error("no user");
          return props.firebase.doPasswordReset(result.data);
        })
        .then(() => {
          setResetStatus(true);
          setAsyncWork(false);
        })
        .catch((err) => {
          setAsyncWork(false);
          setErrorText("User Name is not registered");
        });
    }
  };

  if (resetStatus)
    return (
      <Typography align="center" color="primary" variant="h5" component="h5">
        Reset Email Sent
      </Typography>
    );

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <TextField
        variant="outlined"
        id="username"
        label="User Name or Email"
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        error={errorText}
        helperText={errorText ? errorText : null}
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={asyncWork ? <CircularProgress /> : <EmailIcon />}
        style={{ width: "95%" }}
        onClick={handleReset}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default withFirebase(ForgotForm);
