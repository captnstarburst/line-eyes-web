import { useEffect } from "react";
import SetStorage from "../functions/SessionStorage";

export const useUserSession = (firebase) => {
  useEffect(() => {
    if (
      !sessionStorage.getItem("display_name") ||
      !sessionStorage.getItem("first_name") ||
      !sessionStorage.getItem("last_name") ||
      !sessionStorage.getItem("profile_pic")
    ) {
      const firestore = firebase.getFirestore();
      const uid = firebase.currentUserUID();

      firestore
        .doc("Users/" + uid)
        .get()
        .then((doc) => {
          SetStorage("display_name", doc.data().display_name);
          SetStorage("first_name", doc.data().first_name);
          SetStorage("last_name", doc.data().last_name);
          SetStorage("profile_pic", doc.data().profile_pic);
        });
    }
  }, []);
};
