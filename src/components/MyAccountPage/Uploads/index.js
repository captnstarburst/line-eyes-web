import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ActivityCard from "../../UI/Cards/ActivityCard";
import { withFirebase } from "../../Firebase";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [hasMore, setHasMore] = useState(false);

  const formatTags = (tags) => {
    let arrOfObjs = tags.map((tag, index) => {
      return { key: index, label: tag.split("_").join(" ") };
    });

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

  const fetchMore = () => {
    if (hasMore) {
      let arrOfObjs = [...testUploads];

      firestore
        .collection("UploadedTests")
        .orderBy("uploaded", "desc")
        .where("uploaded_by", "==", uid)
        .where("uploaded", "<", testUploads[testUploads.length - 1].uploaded)
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

            if (querySnapshot.size < 5) {
              setHasMore(false);
            } else {
              setHasMore(true);
            }
          });
        })
        .then(() => {
          setTestUploads(arrOfObjs);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  useEffect(() => {
    let arrOfObjs = [];

    firestore
      .collection("UploadedTests")
      .where("uploaded_by", "==", uid)
      .orderBy("uploaded", "desc")
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

          if (querySnapshot.size < 5) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        });
      })
      .then(() => {
        setTestUploads(arrOfObjs);
      })
      .catch((err) => {
        alert(err);
      });
  }, [firestore, uid]);

  return (
    <section className={classes.root}>
      {testUploads && (
        <InfiniteScroll
          dataLength={testUploads.length} //This is important field to render the next data
          next={fetchMore}
          hasMore={hasMore}
        >
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
        </InfiniteScroll>
      )}
    </section>
  );
};

export default withFirebase(Uploads);
