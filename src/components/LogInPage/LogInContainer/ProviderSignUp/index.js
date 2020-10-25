import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { withFirebase } from "../../../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { compose } from "recompose";

const useStyles = makeStyles((theme) => ({
  SignUpButton: {
    width: "65%",
    marginBottom: "5%",
  },
}));

const ProviderSignUp = (props) => {
  const classes = useStyles();

  const handleGoogleClick = () => {
    const firestore = props.firebase.getFirestore();

    props.firebase
      .doSignInWithGoogle()
      .then(async (authUser) => {
        console.log(authUser.user.uid);
        const userDoc = await firestore
          .collection("Users")
          .doc(authUser.user.uid)
          .get();
        return {
          authUser,
          userDoc,
        };
      })
      .then((obj) => {
        if (!obj.userDoc.exists) {
          return userCreationChain(obj.authUser);
        }

        props.history.push(ROUTES.LANDING);
      })
      .catch((err) => {
        console.log(err);
        props.propagateError();
      });
  };

  const userCreationChain = (authUser) => {
    const firestore = props.firebase.getFirestore();

    return firestore
      .collection("Users")
      .doc(authUser.user.uid)
      .set({
        display_name: authUser.user.displayName,
        email: authUser.user.email,
        first_name: authUser.additionalUserInfo.profile.given_name,
        joined: props.firebase.timestampFrom(new Date()),
        last_name: authUser.additionalUserInfo.profile.family_name,
        profile_pic: authUser.user.photoURL,
      })
      .then(() => {
        return firestore.collection("Birthdays").doc(authUser.user.uid).set({
          birthday: false,
        });
      })
      .then(() => {
        props.history.push(ROUTES.LANDING);
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        props.propagateError();
      });
  };

  return (
    <>
      <Button
        variant="contained"
        className={classes.SignUpButton}
        style={{ color: "#4267B2" }}
        endIcon={<FontAwesomeIcon icon={faFacebook} />}
        onClick={props.firebase.doSignInWithFacebook}
      >
        Sign up with Facebook
      </Button>
      <Button
        variant="contained"
        className={classes.SignUpButton}
        style={{ color: "#0F9D58" }}
        endIcon={<FontAwesomeIcon icon={faGoogle} />}
        onClick={handleGoogleClick}
      >
        Sign up with Google
      </Button>
      <Button
        variant="contained"
        className={classes.SignUpButton}
        style={{ color: "#1da1f2" }}
        endIcon={<FontAwesomeIcon icon={faTwitter} />}
        onClick={props.firebase.doSignInWithTwitter}
      >
        Sign up with Twitter
      </Button>

      <Typography
        align="center"
        color="primary"
        variant="p"
        component="p"
        style={{ fontFamily: "Red Rose, cursive", display: "flex" }}
      >
        or
      </Typography>

      <Button color="primary" onClick={props.propagateCreateClick}>
        Create Account{" "}
      </Button>
    </>
  );
};

const ComposedProviderSignUp = compose(
  withRouter,
  withFirebase
)(ProviderSignUp);

export default ComposedProviderSignUp;
