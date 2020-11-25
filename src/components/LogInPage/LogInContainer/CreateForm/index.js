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

  const [checkingValues, setCheckingValues] = useState(false);

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
      setFormError((prevState) => ({ ...prevState, email: true }));
    } else {
      setFormError((prevState) => ({ ...prevState, email: false }));
    }

    if (userInfo.username === "") {
      setFormError((prevState) => ({ ...prevState, username: true }));
    } else {
      setFormError((prevState) => ({ ...prevState, username: false }));
    }

    if (userInfo.password !== userInfo.password_check) {
      setFormError((prevState) => ({ ...prevState, password: true }));
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

    let check = true;
    const firestore = props.firebase.getFirestore();

    setCheckingValues(true);

    firestore
      .collection("Users")
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
          createUser();
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
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
      .then((authUser) => {
        props.history.push(ROUTES.LANDING);
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        props.propagateError();
      });
  };

  return (
    <CreateFormJSX
      propagateChange={handleChange}
      formError={formError}
      defaultDate={defaultDate}
      checkingValues={checkingValues}
      propagateCreateClick={handleCreateClick}
    />
  );
};

const ComposedCreateForm = compose(withRouter, withFirebase)(CreateForm);

export default ComposedCreateForm;
