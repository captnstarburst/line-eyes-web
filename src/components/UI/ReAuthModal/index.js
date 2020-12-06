import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LogInJSX from "../../UI/LogInJSX/LogIn";
import EmailValidator from "../../functions/EmailValidator";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
      display: "flex",
      flexDirection: "column",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ReAuthModal = (props) => {
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
          //    props.history.push(ROUTES.LANDING);
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
          //    props.history.push(ROUTES.LANDING);
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
    <Modal
      aria-labelledby="reAuth-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.toggle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <h2 id="reAuth-title">Re-Authenticate</h2>
          <p id="transition-modal-description">
            Changing your email address requires a recent to log in
          </p>
          <form className={classes.root} noValidate autoComplete="on">
            <LogInJSX
              propagateChange={handleFormChange}
              errorText={errorText}
              readOnly
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
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ReAuthModal;
