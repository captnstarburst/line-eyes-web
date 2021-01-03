import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ActivityCard from "../../UI/Cards/ActivityCard";
import { withFirebase } from "../../Firebase";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "50px",
  },
});

const Uploads = (props) => {
  const classes = useStyles();
  const firestore = props.firebase.getFirestore();
  const uid = props.firebase.currentUserUID();

  const [testUploads, setTestUploads] = useState(null);

  const formatTags = (tags) => {
    let arrOfObjs = tags.map((tag, index) => {
      return { key: index, label: tag.split("_").join(" ") };
    });

    console.log(arrOfObjs);
    return arrOfObjs;
  };

  const formatDate = (seconds) => {
    const date = new Date(seconds * 1000);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return month + "/" + day + "/" + year;
  };

  const onImageDeletion = (id) => {
    let selectedIndex = 0;
    let uploadCopy = [...testUploads];

    testUploads.forEach((test, index) => {
      if (test.id === id) selectedIndex = index;
    });

    uploadCopy.splice(selectedIndex, selectedIndex + 1);

    setTestUploads(uploadCopy);
  };
  useEffect(() => {
    let arrOfObjs = [];

    firestore
      .collection("UploadedTests")
      .where("uploaded_by", "==", uid)
      .orderBy("uploaded", "asc")
      .limit(5)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          arrOfObjs.push({
            id: doc.id,
            formattedTags: formatTags(doc.data().tags),
            formattedDate: formatDate(doc.data().uploaded.seconds),
            ...doc.data(),
          });
        });
      })
      .then(() => {
        setTestUploads(arrOfObjs);
      })
      .catch((error) => {});
  }, [firestore, uid]);

  return (
    <section className={classes.root}>
      {testUploads && (
        <>
          {testUploads.map((test) => {
            return (
              <ActivityCard
                key={test.id}
                uploadData={test}
                userData={props.userData}
                onImageDelete={onImageDeletion}
                owner
              />
            );
          })}
        </>
      )}
    </section>
  );
};

export default withFirebase(Uploads);
