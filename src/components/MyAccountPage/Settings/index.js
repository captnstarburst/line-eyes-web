import React, { useState, useEffect } from "react";
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
  });

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
      .doc("Emails/" + uid)
      .get()
      .then((doc) => {
        if (!doc.data()) throw new Error("User is missing Email Doc");

        setUserInfo((prevState) => ({
          ...prevState,
          email: doc.data().email,
        }));
      })
      .catch((err) => {
        //handle err
      });
  }, [firestore, uid]);

  const updateUserInfo = (e) => {
    e.persist();
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value.trim(),
    }));
  };
  //   const [checked, setChecked] = React.useState(["wifi"]);

  //   const handleToggle = (value) => () => {
  //     const currentIndex = checked.indexOf(value);
  //     const newChecked = [...checked];

  //     if (currentIndex === -1) {
  //       newChecked.push(value);
  //     } else {
  //       newChecked.splice(currentIndex, 1);
  //     }

  //     setChecked(newChecked);
  //   };

  return <SettingsJSX userInfo={userInfo} propagateUpdate={updateUserInfo} />;
};

export default withFirebase(Settings);
