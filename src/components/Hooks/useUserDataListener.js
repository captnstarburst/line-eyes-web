import { useState, useEffect } from "react";

const useUserDataListener = (firebase) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const firestore = firebase.getFirestore();
    const uid = firebase.currentUserUID();

    const userListener = firestore.doc("Users/" + uid).onSnapshot(
      function (doc) {
        const avatarString =
          doc.data().first_name !== "" && doc.data().last_name !== ""
            ? doc.data().first_name.charAt(0) + doc.data().last_name.charAt(0)
            : doc.data().display_name.substring(0, 2).toUpperCase();

        setUserInfo({
          avatar: avatarString,
          display_name: doc.data().display_name,
          first_name: doc.data().first_name,
          last_name: doc.data().last_name,
          profile_pic: doc.data().profile_pic,
        });
      },
      function (error) {
        //handle err
      }
    );

    return () => userListener();
  }, [firebase]);

  return userInfo;
};

export default useUserDataListener;
