import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AdminCard } from "../../UI/Cards/AdminCard";
import { withFirebase } from "../../Firebase";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px",
  },
});

const AdminActivity = (props) => {
  const classes = useStyles();
  const firestore = props.firebase.getFirestore();

  const [reportedTests, setReportedTests] = useState([]);
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

  const fetchMore = () => {
    firestore
      .collection("UploadedTests")
      .orderBy("uploaded", "asc")
      .where("uploaded", ">", reportedTests[reportedTests.length - 1].uploaded)
      .where("reported", "==", true)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        let arrObjects = [...reportedTests];

        querySnapshot.forEach(function (doc) {
          arrObjects.push({
            docId: doc.id,
            chipData: formatTags(doc.data().tags),
            url: doc.data().url,
            uploaded_by: doc.data().uploaded_by,
            uploaded: formatDate(doc.data().uploaded.seconds),
            data: doc.data(),
          });
        });

        if (querySnapshot.size < 5) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        return arrObjects;
      })
      .then((arrObjects) => {
        setReportedTests(arrObjects);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const filterTests = (id) =>
    setReportedTests(reportedTests.filter((test) => test.docId === id));

  const markForDeletion = (id) => {
    const functions = props.firebase.useFunctions();
    const DeleteReportedTest = functions.httpsCallable("DeleteReportedTest");

    DeleteReportedTest({ docId: id })
      .then((result) => {
        if (!result.data.outcome) throw new Error("error reporting image");

        filterTests(id);
      })
      .catch((err) => {
        alert(err);
        //handle error
      });
  };

  const markAllGood = (id) => {
    const functions = props.firebase.useFunctions();
    const MarkReportedAsOK = functions.httpsCallable("MarkReportedAsOK");

    MarkReportedAsOK({ docId: id })
      .then((result) => {
        if (!result.data.outcome) throw new Error("error reporting image");

        filterTests(id);
      })
      .catch((err) => {
        alert(err);
        //handle error
      });
  };

  useEffect(() => {
    firestore
      .collection("UploadedTests")
      .orderBy("uploaded", "asc")
      .where("reported", "==", true)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        let arrObjects = [];

        querySnapshot.forEach(function (doc) {
          arrObjects.push({
            docId: doc.id,
            chipData: formatTags(doc.data().tags),
            url: doc.data().url,
            uploaded_by: doc.data().uploaded_by,
            uploaded: formatDate(doc.data().uploaded.seconds),
            data: doc.data(),
          });
        });

        if (querySnapshot.size < 5) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        return arrObjects;
      })
      .then((arrObjects) => {
        setReportedTests(arrObjects);
      })
      .catch((err) => {
        alert(err);
      });
  }, [firestore]);

  return (
    <section className={classes.root}>
      {reportedTests && (
        <InfiniteScroll
          dataLength={reportedTests.length} //This is important field to render the next data
          next={fetchMore}
          hasMore={hasMore}
        >
          {reportedTests.map((test) => {
            return (
              <AdminCard
                key={test.docId}
                test={test}
                markForDeletion={markForDeletion}
                markAllGood={markAllGood}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </section>
  );
};

export default withFirebase(AdminActivity);
