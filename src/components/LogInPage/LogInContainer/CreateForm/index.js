import React, { useState, useEffect } from "react";
import CreateFormJSX from "./CreateForm";
import EmailValidator from "../../../functions/EmailValidator";
import SetStorage from "../../../functions/SessionStorage";
import DefaultDateString from "../../../functions/DefaultDateString";
import { withFirebase } from "../../../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { compose } from "recompose";
const CreateForm = (props) => {
  let minimumDateObj = new Date();
  minimumDateObj.setFullYear(minimumDateObj.getFullYear() - 13);
  const minimumDate = DefaultDateString(minimumDateObj);

  let defaultDateObj = new Date();
  defaultDateObj.setFullYear(defaultDateObj.getFullYear() - 18);
  const defaultDate = DefaultDateString(defaultDateObj);

  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    password_check: "",
    dateOfBirth: defaultDate,
  });

  const [formError, setFormError] = useState({
    email: false,
    username: false,
    password: false,
    dateOfBirth: false,
  });

  const [errorText, setErrorText] = useState({
    emailErrorText: "",
    passwordErrorText: "",
  });

  const [checkingValues, setCheckingValues] = useState(false);
  const [asyncWork, setAsyncWork] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    setCheckingValues(false);
  };

  useEffect(() => {
    if (!EmailValidator(userInfo.email)) {
      setFormError((prevState) => ({
        ...prevState,
        email: true,
      }));
      setErrorText((prevState) => ({
        ...prevState,
        emailErrorText: "check email for validity",
      }));
    } else {
      setFormError((prevState) => ({ ...prevState, email: false }));
    }

    if (userInfo.username === "") {
      setFormError((prevState) => ({ ...prevState, username: true }));
    } else {
      setFormError((prevState) => ({ ...prevState, username: false }));
    }

    if (userInfo.password !== userInfo.password_check) {
      setFormError((prevState) => ({
        ...prevState,
        password: true,
      }));
      setErrorText((prevState) => ({
        ...prevState,
        passwordErrorText: "passwords do not match",
      }));
    } else {
      setFormError((prevState) => ({ ...prevState, password: false }));
    }

    if (userInfo.dateOfBirth > minimumDate) {
      setFormError((prevState) => ({ ...prevState, dateOfBirth: true }));
    } else {
      setFormError((prevState) => ({ ...prevState, dateOfBirth: false }));
    }
  }, [minimumDate, userInfo]);

  const handleCreateClick = (e) => {
    e.preventDefault();
    setAsyncWork(true);

    let check = true;
    const firestore = props.firebase.getFirestore();

    setCheckingValues(true);

    firestore
      .collection("DisplayNames")
      .where("display_name", "==", userInfo.username)
      .get()
      .then(function (querySnapshot) {
        if (!querySnapshot.empty) {
          setFormError((prevState) => ({ ...prevState, username: true }));
          check = false;
        }
      })
      .then(() => {
        for (const item in formError) {
          if (formError[item]) {
            check = false;
            return;
          }
        }
      })
      .then(() => {
        if (check) {
          return createUser();
        }
        setAsyncWork(false);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        setAsyncWork(false);
      });
  };

  const createUser = () => {
    const firestore = props.firebase.getFirestore();

    props.firebase
      .doCreateUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(async (authUser) => {
        await firestore
          .collection("Users")
          .doc(authUser.user.uid)
          .set({
            display_name: userInfo.username,
            first_name: "",
            joined: props.firebase.timestampFrom(new Date()),
            last_name: "",
            profile_pic: false,
          });

        SetStorage("display_name", userInfo.username);

        return authUser;
      })
      .then(async (authUser) => {
        await firestore.collection("Emails").doc(authUser.user.uid).set({
          email: userInfo.email,
          display_name: userInfo.username,
        });

        return authUser;
      })
      .then(async (authUser) => {
        await firestore
          .collection("Birthdays")
          .doc(authUser.user.uid)
          .set({
            birthday: props.firebase.timestampFrom(
              new Date(userInfo.dateOfBirth)
            ),
          });

        return authUser;
      })
      .then(async (authUser) => {
        await firestore.collection("Notifications").doc(authUser.user.uid).set({
          push_notifications: true,
          email_notifications: true,
        });

        return authUser;
      })
      .then(async (authUser) => {
        await firestore.collection("DisplayNames").doc(authUser.user.uid).set({
          display_name: userInfo.username,
        });

        return;
      })

      .then(() => {
        props.history.push(ROUTES.LANDING);
      })
      .catch(function (err) {
        const errorCode = err.code;
        setAsyncWork(false);

        if (errorCode === "auth/weak-password") {
          setFormError((prevState) => ({
            ...prevState,
            password: true,
          }));
          setErrorText((prevState) => ({
            ...prevState,
            passwordErrorText: "weak password",
          }));
        } else if (errorCode === "auth/email-already-in-use") {
          setFormError((prevState) => ({
            ...prevState,
            email: true,
          }));
          setErrorText((prevState) => ({
            ...prevState,
            emailErrorText: "email is already in use",
          }));
        } else if (errorCode === "auth/invalid-email") {
          setFormError((prevState) => ({
            ...prevState,
            email: true,
          }));
          setErrorText((prevState) => ({
            ...prevState,
            emailErrorText: "check email for validity",
          }));
        } else {
          props.propagateError();
        }
      });
  };

  return (
    <CreateFormJSX
      propagateChange={handleChange}
      formError={formError}
      errorText={errorText}
      defaultDate={defaultDate}
      checkingValues={checkingValues}
      propagateCreateClick={handleCreateClick}
      asyncWork={asyncWork}
    />
  );
};

const ComposedCreateForm = compose(withRouter, withFirebase)(CreateForm);

export default ComposedCreateForm;
