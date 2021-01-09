import React, { useState, useEffect, useCallback, useRef } from "react";
import LandingPageJSX from "./LandingPage";
import { withAuthorization } from "../Session";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import * as ROUTES from "../constants/routes";

const Landing = (props) => {
  const firestore = props.firebase.getFirestore();
  const uid = props.firebase.currentUserUID();
  const timer = useRef(null);

  const [tagDrawerOpen, setTagDrawerOpen] = useState(true);
  const [selection, setSelection] = useState(null);

  const [chipData, setChipData] = useState([
    [
      { key: 0, header: "Pregnancy_Test", id: "Test_Type" },
      { key: 1, label: "Pregnancy_Test", viewing: true },
      { key: 2, label: "Ovulation_Test", viewing: false },
    ],
  ]);

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

    dataCopy.splice(indices[0], indices[0] + 1, ...updatedTopicArray);

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
      dataCopy.push(getDaysPastTransfer());
    } else if (id.substring(2, 5) === "DPT") {
      dataCopy.push(getDaysPastOvulation());
    }

    setChipData(dataCopy);
  };

  const getCycleDays = () => {
    return [
      { key: 3, header: "Cycle_Day", id: "Cycle_Day" },
      { key: 4, label: "CD 1", viewing: false },
      { key: 5, label: "CD 2", viewing: false },
      { key: 6, label: "CD 3", viewing: false },
      { key: 7, label: "CD 4", viewing: false },
      { key: 8, label: "CD 5", viewing: false },
      { key: 9, label: "CD 6", viewing: false },
      { key: 10, label: "CD 7", viewing: false },
      { key: 11, label: "CD 8", viewing: false },
      { key: 12, label: "CD 9", viewing: false },
      { key: 13, label: "CD 10", viewing: false },
      { key: 14, label: "CD 11", viewing: false },
      { key: 15, label: "CD 12", viewing: false },
      { key: 16, label: "CD 13", viewing: false },
      { key: 17, label: "CD 14", viewing: false },
      { key: 18, label: "CD 15", viewing: false },
      { key: 19, label: "CD 16", viewing: false },
      { key: 20, label: "CD 17", viewing: false },
      { key: 21, label: "CD 18", viewing: false },
      { key: 22, label: "CD 19", viewing: false },
      { key: 23, label: "CD 20", viewing: false },
      { key: 24, label: "CD 21", viewing: false },
      { key: 25, label: "CD 22", viewing: false },
      { key: 26, label: "CD 23", viewing: false },
      { key: 27, label: "CD 24", viewing: false },
      { key: 28, label: "CD 25", viewing: false },
      { key: 29, label: "CD 26", viewing: false },
      { key: 30, label: "CD 27", viewing: false },
      { key: 31, label: "CD 28", viewing: false },
      { key: 32, label: "CD 29", viewing: false },
      { key: 33, label: "CD 30", viewing: false },
      { key: 34, label: "CD 30 +", viewing: false },
    ];
  };

  const getDaysPastOvulation = () => {
    return [
      { key: 35, header: "Days_Past_Ovulation", id: "Days_Past_Ovulation" },
      { key: 36, label: "1 DPO", viewing: false },
      { key: 37, label: "2 DPO", viewing: false },
      { key: 38, label: "3 DPO", viewing: false },
      { key: 39, label: "4 DPO", viewing: false },
      { key: 40, label: "5 DPO", viewing: false },
      { key: 41, label: "6 DPO", viewing: false },
      { key: 42, label: "7 DPO", viewing: false },
      { key: 43, label: "8 DPO", viewing: false },
      { key: 44, label: "9 DPO", viewing: false },
      { key: 45, label: "10 DPO", viewing: false },
      { key: 46, label: "11 DPO", viewing: false },
      { key: 47, label: "12 DPO", viewing: false },
      { key: 48, label: "13 DPO", viewing: false },
      { key: 49, label: "14 DPO", viewing: false },
      { key: 50, label: "15 DPO", viewing: false },
      { key: 51, label: "16 DPO", viewing: false },
      { key: 52, label: "17 DPO", viewing: false },
      { key: 53, label: "18 DPO", viewing: false },
      { key: 54, label: "19 DPO", viewing: false },
      { key: 55, label: "20+ DPO", viewing: false },
    ];
  };

  const getDaysPastTransfer = () => {
    return [
      { key: 56, header: "Days_Past_Transfer", id: "Days_Past_Transfer" },
      { key: 57, label: "1 DPT", viewing: false },
      { key: 58, label: "2 DPT", viewing: false },
      { key: 59, label: "3 DPT", viewing: false },
      { key: 60, label: "4 DPT", viewing: false },
      { key: 61, label: "5 DPT", viewing: false },
      { key: 62, label: "6 DPT", viewing: false },
      { key: 63, label: "7 DPT", viewing: false },
      { key: 64, label: "8 DPT", viewing: false },
      { key: 65, label: "9 DPT", viewing: false },
      { key: 66, label: "10 DPT", viewing: false },
      { key: 67, label: "11 DPT", viewing: false },
      { key: 68, label: "12 DPT", viewing: false },
      { key: 69, label: "13 DPT", viewing: false },
      { key: 70, label: "14 DPT", viewing: false },
      { key: 71, label: "15 DPT", viewing: false },
      { key: 72, label: "16 DPT", viewing: false },
      { key: 73, label: "17 DPT", viewing: false },
      { key: 74, label: "18 DPT", viewing: false },
      { key: 75, label: "19 DPT", viewing: false },
      { key: 76, label: "20+ DPT", viewing: false },
    ];
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
            getDaysPastOvulation(),
            getDaysPastTransfer(),
          ];

          setChipData(updatedTopics);
          break;
        case "Ovulation_Test":
          updatedTopics = [chipData[0], getCycleDays()];

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
