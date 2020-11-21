import { useEffect } from "react";
import SetStorage from "../functions/SessionStorage";

export const useUserSession = (firebase) => {
  useEffect(() => {
    if (
      !sessionStorage.getItem("display_name") ||
      !sessionStorage.getItem("first_name") ||
      !sessionStorage.getItem("last_name") ||
      !sessionStorage.getItem("profile_pic") ||
      !sessionStorage.getItem("avatar")
    ) {
      const firestore = firebase.getFirestore();
      const uid = firebase.currentUserUID();

      firestore
        .doc("Users/" + uid)
        .get()
        .then((doc) => {
          const avatarString =
            doc.data().first_name !== "" && doc.data().last_name !== ""
              ? doc.data().first_name.charAt(0) + doc.data().last_name.charAt(0)
              : doc.data().display_name.substring(0, 2).toUpperCase();

          SetStorage("display_name", doc.data().display_name);
          SetStorage("first_name", doc.data().first_name);
          SetStorage("last_name", doc.data().last_name);
          SetStorage("profile_pic", doc.data().profile_pic);
          SetStorage("avatar", avatarString);
        })
        .catch((err) => {
          //handle err
        });
    }
  }, [firebase]);
};
