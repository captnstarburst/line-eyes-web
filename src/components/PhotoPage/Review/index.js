import React, { useState, useCallback, useEffect } from "react";
import ReviewJSX from "./Review.jsx";

const Review = (props) => {
  const [tagDrawerOpen, setTagDrawerOpen] = useState(true);

  const [chipData, setChipData] = useState([
    [
      { key: 0, header: "Test_Type", id: "Test_Type" },
      { key: 1, label: "Pregnancy_Test", viewing: false },
      { key: 2, label: "Ovulation_Test", viewing: false },
    ],
  ]);

  const [addTopic, setAddTopic] = useState(null);
  const [mountUpload, setMountUpload] = useState(false);

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

    if (id.substring(0, 3) === "DPO") {
      dataCopy.push(getDaysPastTransfer());
    } else if (id.substring(0, 3) === "DPT") {
      dataCopy.push(getDaysPastOvulation());
    }

    setMountUpload(false);
    setChipData(dataCopy);
  };

  const getCycleDays = () => {
    return [
      { key: 3, header: "Cycle_Day", id: "Cycle_Day" },
      { key: 4, label: "CD 0", viewing: false },
      { key: 5, label: "CD 1", viewing: false },
      { key: 6, label: "CD 2", viewing: false },
      { key: 7, label: "CD 3", viewing: false },
      { key: 8, label: "CD 4", viewing: false },
      { key: 9, label: "CD 5", viewing: false },
      { key: 10, label: "CD 6", viewing: false },
      { key: 11, label: "CD 7", viewing: false },
      { key: 12, label: "CD 8", viewing: false },
      { key: 13, label: "CD 9", viewing: false },
      { key: 14, label: "CD 10", viewing: false },
      { key: 15, label: "CD 11", viewing: false },
      { key: 16, label: "CD 12", viewing: false },
      { key: 17, label: "CD 13", viewing: false },
      { key: 18, label: "CD 14", viewing: false },
      { key: 19, label: "CD 15", viewing: false },
      { key: 20, label: "CD 16", viewing: false },
      { key: 21, label: "CD 17", viewing: false },
      { key: 22, label: "CD 18", viewing: false },
      { key: 23, label: "CD 19", viewing: false },
      { key: 24, label: "CD 20", viewing: false },
      { key: 25, label: "CD 21", viewing: false },
      { key: 26, label: "CD 22", viewing: false },
      { key: 27, label: "CD 23", viewing: false },
      { key: 28, label: "CD 24", viewing: false },
      { key: 29, label: "CD 25", viewing: false },
      { key: 30, label: "CD 26", viewing: false },
      { key: 31, label: "CD 27", viewing: false },
      { key: 32, label: "CD 28", viewing: false },
      { key: 33, label: "CD 29", viewing: false },
      { key: 34, label: "CD 30", viewing: false },
      { key: 35, label: "CD 30 +", viewing: false },
    ];
  };

  const getDaysPastOvulation = () => {
    return [
      { key: 36, header: "Days_Past_Ovulation", id: "Days_Past_Ovulation" },
      { key: 37, label: "DPO 1", viewing: false },
      { key: 38, label: "DPO 2", viewing: false },
      { key: 39, label: "DPO 3", viewing: false },
      { key: 40, label: "DPO 4", viewing: false },
      { key: 41, label: "DPO 5", viewing: false },
      { key: 42, label: "DPO 6", viewing: false },
      { key: 43, label: "DPO 7", viewing: false },
      { key: 44, label: "DPO 8", viewing: false },
      { key: 45, label: "DPO 9", viewing: false },
      { key: 46, label: "DPO 10", viewing: false },
      { key: 47, label: "DPO 11", viewing: false },
      { key: 48, label: "DPO 12", viewing: false },
      { key: 49, label: "DPO 13", viewing: false },
      { key: 50, label: "DPO 14", viewing: false },
      { key: 51, label: "DPO 15", viewing: false },
      { key: 52, label: "DPO 16", viewing: false },
      { key: 53, label: "DPO 17", viewing: false },
      { key: 54, label: "DPO 18", viewing: false },
      { key: 55, label: "DPO 19", viewing: false },
      { key: 56, label: "DPO 20+", viewing: false },
    ];
  };

  const getDaysPastTransfer = () => {
    return [
      { key: 57, header: "Days_Past_Transfer", id: "Days_Past_Transfer" },
      { key: 58, label: "DPT 1", viewing: false },
      { key: 59, label: "DPT 2", viewing: false },
      { key: 60, label: "DPT 3", viewing: false },
      { key: 61, label: "DPT 4", viewing: false },
      { key: 62, label: "DPT 5", viewing: false },
      { key: 63, label: "DPT 6", viewing: false },
      { key: 64, label: "DPT 7", viewing: false },
      { key: 65, label: "DPT 8", viewing: false },
      { key: 66, label: "DPT 9", viewing: false },
      { key: 67, label: "DPT 10", viewing: false },
      { key: 68, label: "DPT 11", viewing: false },
      { key: 69, label: "DPT 12", viewing: false },
      { key: 70, label: "DPT 13", viewing: false },
      { key: 71, label: "DPT 14", viewing: false },
      { key: 72, label: "DPT 15", viewing: false },
      { key: 73, label: "DPT 16", viewing: false },
      { key: 74, label: "DPT 17", viewing: false },
      { key: 75, label: "DPT 18", viewing: false },
      { key: 76, label: "DPT 19", viewing: false },
      { key: 77, label: "DPT 20+", viewing: false },
    ];
  };
  useEffect(() => {
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
      case "Cycle_Day":
      case "Days_Past_Ovulation":
      case "Days_Past_Transfer":
        setMountUpload(true);
        break;
      default:
        break;
    }

    setAddTopic(null);
  }, [addTopic, chipData]);

  return (
    <ReviewJSX
      toggleDrawer={toggleDrawer}
      tagDrawerOpen={tagDrawerOpen}
      chipData={chipData}
      handleChipSelection={handleChipSelection}
      handleChipDeletion={handleChipDeletion}
      mountUpload={mountUpload}
    />
  );
};

export default Review;
