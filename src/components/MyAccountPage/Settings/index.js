import React, { useState, useEffect, useRef, useCallback } from "react";
import SettingsJSX from "./Settings";
import DefaultDateString from "../../functions/DefaultDateString";
import EmailValidator from "../../functions/EmailValidator";
import SaveToast from "../../UI/Toasts/SaveToast";
import ErrorToast from "../../UI/Toasts/ErrorToast";
import ImgOnly from "../../functions/ImgOnly";
import { withFirebase } from "../../Firebase";

const Settings = (props) => {
  const [userInfo, setUserInfo] = useState({
    birthdate: null,
    email: null,
    currentEmail: null,
    first_name: props.userData.first_name,
    last_name: props.userData.last_name,
    new_password: null,
    display_name: props.userData.display_name,
    currentDisplayName: props.userData.display_name,
    push_notifications: false,
    email_notifications: false,
  });

  const [userUpdatedInfo, setUserUpdatedInfo] = useState(false);
  const [userUpdateEmail, setUserUpdateEmail] = useState(false);
  const [userUpdateDisplayName, setUserUpdateDisplayName] = useState(false);
  const [displayNameError, setDisplayNameError] = useState(false);
  const [mountReAuth, setMountReAuth] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [onError, setOnError] = useState(false);
  const [accountDeletion, setAccountDeletion] = useState(false);

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
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
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

  useEffect(() => {
    clearInterval(emailTimer.current);

    if (
      userUpdateEmail &&
      EmailValidator(userInfo.email) &&
      userInfo.email !== userInfo.currentEmail
    ) {
      emailTimer.current = setInterval(() => {
        setMountReAuth(true);
      }, 2500);
    }

    return () => {
      clearInterval(emailTimer.current);
    };
  }, [userInfo.currentEmail, userInfo.email, userUpdateEmail]);

  useEffect(() => {
    clearInterval(displayNameTimer.current);

    if (
      userUpdateDisplayName &&
      userInfo.display_name !== userInfo.currentDisplayName
    ) {
      displayNameTimer.current = setInterval(() => {
        firestore
          .collection("DisplayNames")
          .where("display_name", "==", userInfo.display_name)
          .get()
          .then(function (querySnapshot) {
            if (!querySnapshot.empty) setDisplayNameError(true);
            else setMountReAuth(true);
          });
      }, 3500);
    }

    return () => {
      clearInterval(displayNameTimer.current);
    };
  }, [
    firestore,
    userInfo.currentDisplayName,
    userInfo.display_name,
    userInfo.username,
    userUpdateDisplayName,
  ]);

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
      case "display_name":
        setUserUpdateDisplayName(true);
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

  const reAuthSuccess = () => {
    if (userUpdateEmail && userUpdateDisplayName) {
      changeEmail();
      changeUserName();
    } else if (userUpdateEmail) {
      changeEmail();
    } else if (userUpdateDisplayName) {
      changeUserName();
    } else if (accountDeletion) {
      props.firebase.doAccountDelete();
    }
  };
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
        setUserUpdateEmail(false);
      })
      .catch((err) => {
        setOnError(true);
      });
  };

  const changeUserName = () => {
    const displayNamesRef = firestore.doc("DisplayNames/" + uid);

    displayNamesRef
      .update({
        display_name: userInfo.display_name,
      })
      .then(() => {
        toggleReAuthMount();
        setOnSuccess(true);
        setUserUpdateDisplayName(false);
      })
      .catch((err) => {
        setOnError(true);
      });
  };

  const handleDeletionClick = () => {
    setAccountDeletion(true);
    toggleReAuthMount();
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileSelection = async (e) => {
    if (e.target.files.length) {
      if (!ImgOnly(e.target.files[0])) {
        alert("Images only");
      } else {
        const uploadTask = props.firebase
          .getStorage()
          .child(`/Users/${uid}/profile_pic`)
          .put(e.target.files[0]);

        await uploadTask.on(
          "state_changed",
          null,
          (error) => {
            setOnError(true);
          },
          () => {
            props.firebase
              .getStorage()
              .child(`/Users/${uid}/profile_pic`)
              .getDownloadURL()
              .then((url) => {
                firestore
                  .doc("Users/" + uid)
                  .update({
                    profile_pic: url,
                  })
                  .catch((err) => {
                    setOnError(true);
                  });
              });
          }
        );
      }
    }
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
        propagateAuthSuccess={reAuthSuccess}
        displayNameError={displayNameError}
        onSuccess={onSuccess}
        onError={onError}
        propagateDeleteClick={handleDeletionClick}
        propagateUploadClick={handleUploadClick}
        profile_pic={props.userData.profile_pic}
        avatar={props.userData.avatar}
      />
      <input
        id={"fileInput"}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileSelection}
      />
      <SaveToast saved={onSuccess} />
      <ErrorToast error={onError} />
    </>
  );
};

export default withFirebase(Settings);
