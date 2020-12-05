import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  const [errorText, setErrorText] = useState("");
  const [asyncWork, setAsyncWork] = useState(false);

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

    if (setErrorText) setErrorText("");
  };

  const handleSignIn = () => {
    setAsyncWork(true);
    if (EmailValidator(user)) {
      props.firebase
        .doSignInWithEmailAndPassword(user, password)
        .then((authUser) => {
          props.history.push(ROUTES.LANDING);
        })
        .catch(function (error) {
          const errCode = error.code;

          setAsyncWork(true);

          switch (errCode) {
            case "auth/wrong-password":
              setErrorText("incorrect password");
              break;
            case "auth/user-not-found":
              setErrorText("email is not registered");
              break;
            default:
              props.propagateError();
              break;
          }
          console.log(JSON.stringify(error));
          // props.propagateError();
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
          // setErrorText("No User Registered");
          setAsyncWork(false);

          if (err.message === "no user") {
            setErrorText("User Name is not registered");
          } else {
            const errCode = err.code;
            switch (errCode) {
              case "auth/wrong-password":
                setErrorText("incorrect password");
                break;
              case "auth/user-not-found":
                setErrorText("email is not registered");
                break;
              default:
                props.propagateError();
                break;
            }
          }
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
        error={errorText}
        helperText={errorText ? errorText : null}
      />
      <TextField
        variant="outlined"
        id="password"
        label="Password"
        type="password"
        onChange={handleFormChange}
        error={errorText}
        helperText={errorText ? errorText : null}
      />

      <Button
        variant="contained"
        color="primary"
        endIcon={asyncWork ? <CircularProgress /> : <AccountCircleIcon />}
        style={{ width: "95%" }}
        onClick={handleSignIn}
        disabled={asyncWork}
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
