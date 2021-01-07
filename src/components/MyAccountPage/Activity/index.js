import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ActivityCard from "../../UI/Cards/ActivityCard";
import { ReportToast } from "../../UI/Toasts/ReportToast";
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

const Activity = (props) => {
  const classes = useStyles();
  const firestore = props.firebase.getFirestore();
  const uid = props.firebase.currentUserUID();

  const [activities, setActivities] = useState([]);
  const [tests, setTests] = useState([]);
  const [retrieveTests, setRetrieval] = useState(false);
  const [reported, setReported] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const timer = useRef(null);
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

  const handleReportImage = (id) => {
    const functions = props.firebase.useFunctions();
    const ReportImage = functions.httpsCallable("ReportImage");

    ReportImage({ docId: id })
      .then((result) => {
        if (!result.data.outcome) throw new Error("error reporting image");
        console.log("next");
        console.log(tests);

        let testsCopy = tests.map((test) => {
          if (test.id === id) return { ...test, reported: true };
          return { ...test };
        });

        setTests(testsCopy);
        setReported(true);
      })
      .catch((err) => {
        //handle error
      });
  };

  const fetchMore = () => {
    if (hasMore) {
      firestore
        .collection("ActivityFeed/" + uid + "/History")
        .orderBy("responded", "desc")
        .where("responded", "<", activities[activities.length - 1].responded)
        .limit(5)
        .get()
        .then((querySnapshot) => {
          let activityArr = [...activities];

          querySnapshot.forEach(function (doc) {
            activityArr.push({
              docId: doc.id,
              responded: doc.data().responded,
            });
          });

          setActivities(activityArr);
          setRetrieval(true);

          if (querySnapshot.size < 5) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        })
        .catch((error) => {
          setHasMore(false);
        });
    }
  };
  useEffect(() => {
    firestore
      .collection("ActivityFeed/" + uid + "/History")
      .orderBy("responded", "desc")
      .limit(5)
      .get()
      .then((querySnapshot) => {
        let activityArr = [];

        querySnapshot.forEach(function (doc) {
          activityArr.push({ docId: doc.id, responded: doc.data().responded });
        });

        setActivities(activityArr);
        setRetrieval(true);

        if (activityArr.size < 5) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      })
      .catch((error) => {
        setHasMore(false);
      });
  }, [firestore, uid]);

  useEffect(() => {
    if (retrieveTests) {
      setRetrieval(false);
      let arrOfObjs = [...tests];
      let promises = activities.map((activity, i) => {
        return new Promise((resolve, reject) => {
          if (tests.length && i < tests.length) {
            resolve();
          } else {
            firestore
              .doc("UploadedTests/" + activity.docId)
              .get()
              .then((doc) => {
                arrOfObjs.push({
                  id: doc.id,
                  formattedTags: formatTags(doc.data().tags),
                  formattedDate: formatDate(doc.data().uploaded.seconds),
                  ...doc.data(),
                });
                return doc.data();
              })
              .then((testData) => {
                return firestore
                  .doc("DisplayNames/" + testData.uploaded_by)
                  .get();
              })
              .then((NamesDoc) => {
                let index;

                arrOfObjs.forEach((test, i) => {
                  if (test.id === activity.docId) index = i;
                });

                arrOfObjs[index] = {
                  ...arrOfObjs[index],
                  uploaded_by_display_name: NamesDoc.data().display_name,
                };
              })
              .then(() => {
                resolve();
              })
              .catch((err) => {
                reject();
              });
          }
        });
      });

      Promise.allSettled(promises).then((values) => {
        setTests(arrOfObjs);
      });
    }
  }, [activities, firestore, retrieveTests, tests]);

  useEffect(() => {
    clearTimeout(timer.current);

    if (reported) {
      timer.current = setTimeout(() => {
        setReported(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [reported]);

  return (
    <section className={classes.root}>
      {tests && (
        <InfiniteScroll
          dataLength={tests.length} //This is important field to render the next data
          next={fetchMore}
          hasMore={hasMore}
        >
          {tests.map((test) => {
            return (
              <ActivityCard
                key={test.id}
                uploadData={test}
                userData={{ display_name: test.uploaded_by_display_name }}
                onImageDelete={() => {}}
                handleReportImage={handleReportImage}
              />
            );
          })}
        </InfiniteScroll>
      )}
      <ReportToast reported={reported} />
    </section>
  );
};

export default withFirebase(Activity);
