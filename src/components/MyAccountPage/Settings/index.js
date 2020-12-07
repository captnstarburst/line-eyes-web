import React, { useState, useEffect, useRef, useCallback } from "react";
import SettingsJSX from "./Settings";
import DefaultDateString from "../../functions/DefaultDateString";
import setStorage from "../../functions/SessionStorage";
import EmailValidator from "../../functions/EmailValidator";
import SaveToast from "../../UI/Toasts/SaveToast";
import ErrorToast from "../../UI/Toasts/ErrorToast";
import { withFirebase } from "../../Firebase";

const Settings = (props) => {
  const [userInfo, setUserInfo] = useState({
    birthdate: null,
    email: null,
    currentEmail: null,
    first_name: sessionStorage.getItem("first_name"),
    last_name: sessionStorage.getItem("last_name"),
    new_password: null,
    display_name: sessionStorage.getItem("display_name"),
    currentDisplayName: sessionStorage.getItem("display_name"),
    push_notifications: false,
    email_notifications: false,
  });

  const [userUpdatedInfo, setUserUpdatedInfo] = useState(false);
  const [userUpdateEmail, setUserUpdateEmail] = useState(false);
  const [mountReAuth, setMountReAuth] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [onError, setOnError] = useState(false);

  const timer = useRef(null);
  const emailTimer = useRef(null);
  const displayNameTimer = useRef(null);

  const uid = props.firebase.currentUserUID();
  const firestore = props.firebase.getFirestore();
  useEffect(() => {
    firestore
      .doc("Birthdays/" + uid)
      .get()
      .then((doc) => {
        if (!doc.data()) throw new Error("User is missing Birthday Doc");

        const bDayObj = DefaultDateString(
          new Date(doc.data().birthday.seconds * 1000)
        );

        setUserInfo((prevState) => ({
          ...prevState,
          birthdate: bDayObj,
        }));
      })
      .catch((err) => {
        //handle err
      });
  }, [firestore, uid]);

  useEffect(() => {
    firestore
      .doc("Notifications/" + uid)
      .get()
      .then((doc) => {
        if (!doc.data()) throw new Error("User is missing Notification Doc");

        setUserInfo((prevState) => ({
          ...prevState,
          push_notifications: doc.data().push_notifications,
          email_notifications: doc.data().email_notifications,
        }));
      })
      .catch((err) => {
        //handle err
      });
  }, [firestore, uid]);

  useEffect(() => {
    firestore
      .doc("Emails/" + uid)
      .get()
      .then((doc) => {
        if (!doc.data()) throw new Error("User is missing Email Doc");

        setUserInfo((prevState) => ({
          ...prevState,
          email: doc.data().email,
          currentEmail: doc.data().email,
        }));
      })
      .catch((err) => {
        //handle err
      });
  }, [firestore, uid]);

  useEffect(() => {
    clearInterval(timer.current);

    if (userUpdatedInfo) {
      timer.current = setInterval(() => {
        const birthdayRef = firestore.doc("Birthdays/" + uid);
        const notificationRef = firestore.doc("Notifications/" + uid);
        const userRef = firestore.doc("Users/" + uid);

        userRef
          .update({
            display_name: userInfo.display_name,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
          })
          .then(() => {
            setStorage("display_name", userInfo.display_name);
            setStorage("first_name", userInfo.first_name);
            setStorage("last_name", userInfo.last_name);
          })
          .catch((err) => {
            //handle err
          });

        birthdayRef
          .update({
            birthday: props.firebase.timestampFrom(
              new Date(userInfo.birthdate)
            ),
          })
          .catch((err) => {
            //handle err
          });

        notificationRef
          .update({
            email_notifications: userInfo.email_notifications,
            push_notifications: userInfo.push_notifications,
          })
          .catch((err) => {
            //handle err
          });

        setUserUpdatedInfo(false);
      }, 2500);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [
    firestore,
    props.firebase,
    uid,
    userInfo.birthdate,
    userInfo.display_name,
    userInfo.email_notifications,
    userInfo.first_name,
    userInfo.last_name,
    userInfo.push_notifications,
    userUpdatedInfo,
  ]);

  useEffect(() => {
    clearInterval(emailTimer.current);

    if (
      userUpdateEmail &&
      EmailValidator(userInfo.email) &&
      userInfo.email !== userInfo.currentEmail
    ) {
      emailTimer.current = setInterval(() => {
        setMountReAuth(true);
        setUserUpdateEmail(false);
      }, 2500);
    }

    return () => {
      clearInterval(emailTimer.current);
    };
  }, [userInfo.currentEmail, userInfo.email, userUpdateEmail]);

  const updateUserInfo = (e) => {
    e.persist();
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value.trim(),
    }));

    switch (e.target.id) {
      case "email":
        setUserUpdateEmail(true);
        break;
      default:
        setUserUpdatedInfo(true);
    }
  };

  const handleToggle = (e) => {
    // e.persist();
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.checked,
    }));

    setUserUpdatedInfo(true);
  };

  const handlePasswordReset = (e) => {
    props.firebase.doPasswordReset(props.firebase.currentUserEmail());
    props.firebase.doSignOut();
  };

  const toggleReAuthMount = useCallback(() => {
    setMountReAuth((prevState) => !prevState);
  }, []);

  const changeEmail = () => {
    const emailsRef = firestore.doc("Emails/" + uid);

    props.firebase
      .updateUserEmail(userInfo.email)
      .then(() => {
        return emailsRef.update({
          email: userInfo.email,
        });
      })
      .then(() => {
        toggleReAuthMount();
        setOnSuccess(true);
      })
      .catch((err) => {
        setOnError(true);
      });
  };

  return (
    <>
      <SettingsJSX
        userInfo={userInfo}
        propagateUpdate={updateUserInfo}
        propagateToggle={handleToggle}
        propagateReset={handlePasswordReset}
        toggleReAuthMount={toggleReAuthMount}
        mountReAuth={mountReAuth}
        propagateAuthSuccess={changeEmail}
        onSuccess={onSuccess}
        onError={onError}
      />
      <SaveToast saved={onSuccess} />
      <ErrorToast error={onError} />
    </>
  );
};

export default withFirebase(Settings);
