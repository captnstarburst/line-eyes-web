import React, { useState, useEffect, useCallback, useRef } from "react";
import LandingPageJSX from "./LandingPage";
import { withAuthorization } from "../Session";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import * as ROUTES from "../constants/routes";
import * as RAW_TAG_DATA from "../constants/RawTagData";
const Landing = (props) => {
  const firestore = props.firebase.getFirestore();
  const uid = props.firebase.currentUserUID();
  const timer = useRef(null);

  const [tagDrawerOpen, setTagDrawerOpen] = useState(true);
  const [selection, setSelection] = useState(null);

  const [chipData, setChipData] = useState([RAW_TAG_DATA.getTestType()]);

  const [addTopic, setAddTopic] = useState(null);
  const [tests, setTests] = useState(null);
  const [noMoreTests, setNoMoreTests] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reported, setReported] = useState(false);
  const [getTests, setGetTests] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);

  const handleRouteToPhotoPage = () => {
    props.history.push(ROUTES.PHOTO);
  };

  const toggleDrawer = useCallback(
    () => setTagDrawerOpen((state) => !state),
    []
  );

  const propagateSelection = (selected) => {
    firestore
      .doc("UploadedTests/" + tests[0].docId)
      .collection("responses")
      .doc(uid)
      .set({
        response: selected,
      })
      .catch((err) => {
        //handle error
      });

    setSelection(selected);
  };
  const handleChipSelection = (id) => {
    let indices = [];
    let dataCopy = [...chipData];
    chipData.forEach((topicArrays, topicIndex) => {
      if (indices.length > 0) return;
      topicArrays.forEach((item, itemIndex) => {
        if (indices.length > 0) return;
        if (item.label === id) indices = [topicIndex, itemIndex];
      });
    });

    let updatedTopicArray = [];

    updatedTopicArray.push(
      chipData[indices[0]].map((item, itemIndex) => {
        if (itemIndex === 0) return { key: item.key, header: id, id: item.id };
        if (itemIndex === indices[1])
          return { key: item.key, label: item.label, viewing: true };
        return { key: item.key, label: item.label, viewing: false };
      })
    );

    if (dataCopy.length === 4) dataCopy.splice(1, 2, ...updatedTopicArray);
    else dataCopy.splice(indices[0], indices[0] + 1, ...updatedTopicArray);

    setChipData(dataCopy);

    if (chipData[indices[0]][0].id === "Test_Type") {
      setAddTopic(id);
    } else {
      setAddTopic(chipData[indices[0]][0].id);
    }
  };
  const handleChipDeletion = (id) => {
    let indices = [];
    let dataCopy = [...chipData];
    chipData.forEach((topicArrays, topicIndex) => {
      if (indices.length > 0) return;
      topicArrays.forEach((item, itemIndex) => {
        if (indices.length > 0) return;
        if (item.label === id) indices = [topicIndex, itemIndex];
      });
    });

    let updatedTopicArray = [];

    updatedTopicArray.push(
      chipData[indices[0]].map((item, itemIndex) => {
        if (itemIndex === 0)
          return { key: item.key, header: item.id, id: item.id };

        return { key: item.key, label: item.label, viewing: false };
      })
    );

    if (id === "Ovulation_Test") {
      dataCopy.pop();
    } else if (id === "Pregnancy_Test") {
      dataCopy.pop();
      dataCopy.pop();
    }

    dataCopy.splice(indices[0], indices[0] + 1, ...updatedTopicArray);

    if (id.substring(2, 5) === "DPO") {
      dataCopy.push(RAW_TAG_DATA.getDaysPastTransfer());
    } else if (id.substring(2, 5) === "DPT") {
      dataCopy.push(RAW_TAG_DATA.getDaysPastOvulation());
    }

    setChipData(dataCopy);
  };

  const handleReportImage = () => {
    const functions = props.firebase.useFunctions();
    const ReportImage = functions.httpsCallable("ReportImage");

    ReportImage({ docId: tests[0].docId })
      .then((result) => {
        if (!result.data.outcome) throw new Error("error reporting image");

        setReported(true);
      })
      .catch((err) => {
        //handle error
      });
  };

  useEffect(() => {
    if (addTopic) {
      let updatedTopics = [];
      switch (addTopic) {
        case "Pregnancy_Test":
          updatedTopics = [
            chipData[0],
            RAW_TAG_DATA.getDaysPastOvulation(),
            RAW_TAG_DATA.getDaysPastTransfer(),
            RAW_TAG_DATA.getCycleDays(),
          ];

          setChipData(updatedTopics);
          break;
        case "Ovulation_Test":
          updatedTopics = [chipData[0], RAW_TAG_DATA.getCycleDays()];

          setChipData(updatedTopics);
          break;
        // case "Cycle_Day":
        // case "Days_Past_Ovulation":
        // case "Days_Past_Transfer":
        //   break;
        default:
          break;
      }

      setAddTopic(null);
    }
  }, [addTopic, chipData]);

  useEffect(() => {
    /*
      Check if user has already reviewed the most recent test based on the current selected tags.
      If no tests are found or if the user has responded to the most recent test show no more.
      Else setGetMore Tests
    */
    setLoading(true);
    setGetTests(false);

    let selectionArr = [];

    chipData.forEach((topic) => {
      topic.forEach((item) => {
        if (item.viewing) {
          selectionArr.push(item.label);
        }
      });
    });

    if (selectionArr.length === 0) {
      setNoMoreTests(true);
      setLoading(false);
    } else {
      firestore
        .collection("UploadedTests")
        .orderBy("uploaded_by", "desc")
        .orderBy("uploaded", "desc")
        .where("reported", "==", false)
        .where("uploaded_by", "!=", uid)
        .where("tags", "array-contains-any", selectionArr)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          let docId = "";
          querySnapshot.forEach(function (doc) {
            docId = doc.id;
          });

          return docId;
        })
        .then((docId) => {
          if (!docId) return;

          return firestore
            .doc("UploadedTests/" + docId + "/responses/" + uid)
            .get();
        })
        .then((responseDoc) => {
          if (typeof responseDoc === "undefined") {
            setNoMoreTests(true);
            setLoading(false);
          } else if (responseDoc.exists || !responseDoc) {
            setNoMoreTests(true);
            setLoading(false);
          } else {
            setGetTests(true);
          }
        })
        .catch((err) => {
          alert(err);
          // console.log("Error getting documents: ", error);
        });
    }
  }, [chipData, firestore, uid]);

  useEffect(() => {
    //Get last responded test by user based on the current tags

    if (getTests) {
      let selectionArr = [];

      chipData.forEach((topic) => {
        topic.forEach((item) => {
          if (item.viewing) {
            selectionArr.push(item.label);
          }
        });
      });

      firestore
        .collection("ActivityFeed/" + uid + "/History")
        .orderBy("responded", "desc")
        .where("tags", "array-contains-any", selectionArr)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          let uploaded = 1;
          querySnapshot.forEach(function (doc) {
            uploaded = doc.data().uploaded;
          });

          return uploaded;
        })
        .then((uploaded) => {
          setLastResponse(uploaded);
          setGetTests(false);
        })
        .catch((err) => {
          setNoMoreTests(true);
          setLoading(false);
          setLastResponse(false);
          setGetTests(false);
        });
    }
  }, [chipData, firestore, getTests, uid]);

  useEffect(() => {
    if (lastResponse) {
      let selectionArr = [];

      chipData.forEach((topic) => {
        topic.forEach((item) => {
          if (item.viewing) {
            selectionArr.push(item.label);
          }
        });
      });

      let query;

      if (lastResponse === 1) {
        query = firestore
          .collection("UploadedTests")
          .orderBy("uploaded_by", "asc")
          .orderBy("uploaded", "asc")
          .where("uploaded_by", "!=", uid)
          .where("reported", "==", false)
          .where("tags", "array-contains-any", selectionArr)
          .limit(1)
          .get();
      } else {
        query = firestore
          .collection("UploadedTests")
          .orderBy("uploaded", "asc")
          .where("uploaded", ">", lastResponse)
          .where("reported", "==", false)
          .where("tags", "array-contains-any", selectionArr)
          .limit(1)
          .get();
      }

      query
        .then((querySnapshot) => {
          let arrObjects = [];
          querySnapshot.forEach(function (doc) {
            arrObjects.push({
              docId: doc.id,
              url: doc.data().url,
              uploaded: doc.data().uploaded,
              uploaded_by: doc.data().uploaded_by,
            });
          });
          return arrObjects;
        })
        .then((arrObjects) => {
          if (!arrObjects) {
            setNoMoreTests(true);
            setLastResponse(null);
            setLoading(false);
          } else if (arrObjects.uploaded_by === uid) {
            setLastResponse(arrObjects.uploaded);
          } else {
            setTests(arrObjects);
            setLastResponse(null);
            setLoading(false);
          }
        })
        .catch((err) => {
          alert(err);
          setNoMoreTests(true);
          setLoading(false);
          setLastResponse(false);
          setGetTests(false);
        });
    }
  }, [chipData, firestore, lastResponse, uid]);

  useEffect(() => {
    clearTimeout(timer.current);

    if (selection) {
      timer.current = setTimeout(() => {
        setLastResponse(tests[0].uploaded);
        setSelection(false);
        setLoading(true);
      }, 1000);

      return () => {
        clearTimeout(timer.current);
      };
    }
  }, [props.firebase, selection, tests]);

  return (
    <LandingPageJSX
      chipData={chipData}
      handleChipSelection={handleChipSelection}
      tagDrawerOpen={tagDrawerOpen}
      toggleDrawer={toggleDrawer}
      handleChipDeletion={handleChipDeletion}
      handleReportImage={handleReportImage}
      handleRouteToPhotoPage={handleRouteToPhotoPage}
      propagateSelection={propagateSelection}
      selection={selection}
      reported={reported}
      tests={tests}
      loading={loading}
      noMoreTests={noMoreTests}
    />
  );
};

const condition = (authUser) => !!authUser;

const ComposedLanding = compose(withRouter, withFirebase)(Landing);

export default withAuthorization(condition)(ComposedLanding);
