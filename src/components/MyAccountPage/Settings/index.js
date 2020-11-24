import React, { useState, useEffect, useRef } from "react";
import SettingsJSX from "./Settings";
import DefaultDateString from "../../functions/DefaultDateString";
import { withFirebase } from "../../Firebase";

const Settings = (props) => {
  const [userInfo, setUserInfo] = useState({
    birthdate: null,
    email: null,
    first_name: sessionStorage.getItem("first_name"),
    last_name: sessionStorage.getItem("last_name"),
    new_password: null,
    display_name: sessionStorage.getItem("display_name"),
    push_notifications: false,
    email_notifications: false,
  });

  const [userUpdatedInfo, setUserUpdatedInfo] = useState(false);
  const timer = useRef(null);

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
    clearInterval(timer.current);

    if (userUpdatedInfo) {
      timer.current = setInterval(() => {
        const birthdayRef = firestore.doc("Birthdays/" + uid);
        const notificationRef = firestore.doc("Notifications/" + uid);
        const userRef = firestore.doc("Users/" + uid);

        userRef.update({
          display_name: userInfo.display_name,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
        });

        birthdayRef.update({
          birthday: props.firebase.timestampFrom(new Date(userInfo.birthdate)),
        });

        notificationRef.update({
          email_notifications: userInfo.email_notifications,
          push_notifications: userInfo.push_notifications,
        });

        setUserUpdatedInfo(false);
      }, 2000);
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

  const updateUserInfo = (e) => {
    e.persist();
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value.trim(),
    }));

    setUserUpdatedInfo(true);
  };

  const handleToggle = (e) => {
    // e.persist();
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.checked,
    }));

    setUserUpdatedInfo(true);
  };

  return (
    <SettingsJSX
      userInfo={userInfo}
      propagateUpdate={updateUserInfo}
      propagateToggle={handleToggle}
    />
  );
};

export default withFirebase(Settings);
