import React, { useState, useCallback, useEffect } from "react";
import ReviewJSX from "./Review.jsx";
import ImgOnly from "../../functions/ImgOnly";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../Firebase";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import * as RAW_TAG_DATA from "../../constants/RawTagData";

const Review = (props) => {
  const [tagDrawerOpen, setTagDrawerOpen] = useState(true);
  const [pendingUploadURL, setPendingUploadURL] = useState(null);
  const [pendingUploadFile, setPendingUploadFile] = useState(null);
  const [chipData, setChipData] = useState([RAW_TAG_DATA.getTestType()]);

  const [addTopic, setAddTopic] = useState(null);
  const [mountUpload, setMountUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  const toggleDrawer = useCallback(() => {
    setTagDrawerOpen((prevState) => !prevState);
  }, []);

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
      setMountUpload(false);
    } else if (id === "Pregnancy_Test") {
      dataCopy.pop();
      dataCopy.pop();
      dataCopy.pop();
      setMountUpload(false);
    }

    dataCopy.splice(indices[0], indices[0] + 1, ...updatedTopicArray);

    if (id.substring(2, 5) === "DPO") {
      dataCopy.push(RAW_TAG_DATA.getDaysPastTransfer());
      dataCopy.push(RAW_TAG_DATA.getCycleDays());
    } else if (id.substring(2, 5) === "DPT") {
      dataCopy.push(RAW_TAG_DATA.getDaysPastOvulation());
      dataCopy.push(RAW_TAG_DATA.getCycleDays());
    }

    setChipData(dataCopy);
  };

  const simulateInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileSelection = async (e) => {
    if (e.target.files.length) {
      if (!ImgOnly(e.target.files[0])) {
        alert("Images only");
      } else {
        setPendingUploadFile(e.target.files[0]);
        setPendingUploadURL(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleUpload = async () => {
    const uid = props.firebase.currentUserUID();
    const uuid = uuidv4();
    setUploading(true);

    let tags = [];
    chipData.forEach((topicArrays, topicIndex) => {
      topicArrays.forEach((item, itemIndex) => {
        if (item.viewing) tags.push(item.label);
      });
    });

    const uploadTask = props.firebase
      .getStorage()
      .child(`/Tests/${uid}/${uuid}`)
      .put(pendingUploadFile);

    await uploadTask.on(
      "state_changed",
      null,
      (error) => {
        // setOnError(true);
      },
      () => {
        const functions = props.firebase.useFunctions();
        const TestImageUploaded = functions.httpsCallable("TestImageUploaded");

        const storageRef = props.firebase
          .getStorage()
          .child(`/Tests/${uid}/${uuid}_500x500`);

        retrieveResizedImage(10, storageRef)
          .then((url) => {
            return TestImageUploaded({ uuid, tags, uid, url });
          })
          .then((result) => {
            console.log(result);
            if (!result.data.outcome) throw new Error(result.data.message);
            props.history.push(ROUTES.My_Account + "/uploads");
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          });
      }
    );
  };

  const delayPoll = (t, v) => {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, v), t);
    });
  };

  const retrieveResizedImage = (triesRemaining, storageRef) => {
    if (triesRemaining < 0) {
      return Promise.reject("out of tries");
    }

    return storageRef
      .getDownloadURL()
      .then((url) => {
        return url;
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            return delayPoll(2000).then(() => {
              return retrieveResizedImage(triesRemaining - 1, storageRef);
            });
          default:
            console.log(error);
            return Promise.reject(error);
        }
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
        //   setMountUpload(true);
        //   break;
        default:
          break;
      }

      setMountUpload(true);
      setAddTopic(null);
    }
  }, [addTopic, chipData]);

  // useEffect(() => {
  //   if (!props.url) {
  //     props.history.push(ROUTES.PHOTO);
  //   }
  // }, [props.history, props.url]);

  return (
    <>
      <ReviewJSX
        toggleDrawer={toggleDrawer}
        tagDrawerOpen={tagDrawerOpen}
        chipData={chipData}
        simulateInputClick={simulateInputClick}
        handleChipSelection={handleChipSelection}
        handleChipDeletion={handleChipDeletion}
        handleUpload={handleUpload}
        mountUpload={mountUpload}
        url={pendingUploadURL}
        uploading={uploading}
      />
      <input
        id={"fileInput"}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileSelection}
      />
    </>
  );
};

const ComposedReview = compose(withRouter)(Review);

export default withFirebase(ComposedReview);
