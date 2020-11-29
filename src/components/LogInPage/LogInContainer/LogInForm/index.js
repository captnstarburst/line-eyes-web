import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailValidator from "../../../functions/EmailValidator";
import { withFirebase } from "../../../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { compose } from "recompose";

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

const LoginForm = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleFormChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUser(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSignIn = () => {
    if (EmailValidator(user)) {
      props.firebase
        .doSignInWithEmailAndPassword(user, password)
        .then((authUser) => {
          props.history.push(ROUTES.LANDING);
        })
        .catch(function (error) {
          console.log(JSON.stringify(error));
          props.propagateError();
        });
    } else {
      const functions = props.firebase.useFunctions();
      const ReturnEmail = functions.httpsCallable("ReturnEmail");

      ReturnEmail({ display_name: user })
        .then((result) => {
          if (result.data === "") throw new Error("no user");

          return props.firebase.doSignInWithEmailAndPassword(
            result.data,
            password
          );
        })
        .then((authUser) => {
          props.history.push(ROUTES.LANDING);
        })
        .catch((err) => {
          //handle error
        });
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <TextField
        variant="outlined"
        id="username"
        label="User Name or Email"
        type="text"
        onChange={handleFormChange}
      />
      <TextField
        variant="outlined"
        id="password"
        label="Password"
        type="password"
        onChange={handleFormChange}
      />

      <Button
        variant="contained"
        color="primary"
        endIcon={<AccountCircleIcon />}
        style={{ width: "95%" }}
        onClick={handleSignIn}
      >
        Log In
      </Button>

      <Button color="primary" onClick={props.propagateForgot}>
        {" "}
        Forgot Password{" "}
      </Button>
    </form>
  );
};
const ComposedLogInForm = compose(withRouter, withFirebase)(LoginForm);

export default ComposedLogInForm;
