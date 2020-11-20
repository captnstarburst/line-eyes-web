import React, { useState, useEffect } from "react";
import SettingsJSX from "./Settings";
import DefaultDateString from "../../functions/DefaultDateString";
import { withFirebase } from "../../Firebase";
const Settings = (props) => {
  const [userInfo, setUserInfo] = useState({
    birthdate: null,
  });

  const uid = props.firebase.currentUserUID();

  useEffect(() => {
    const firestore = props.firebase.getFirestore();

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
  }, [props.firebase, uid]);
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

  return <SettingsJSX userInfo={userInfo} />;
};

export default withFirebase(Settings);
