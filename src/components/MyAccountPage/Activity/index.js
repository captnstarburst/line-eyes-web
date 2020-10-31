import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ActivityCard } from "../../UI/Cards/ActivityCard";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px",
  },
});

const chipData = [
  { key: 0, label: "Pregnancy Test" },
  { key: 1, label: "Clear Blue" },
  { key: 2, label: "DPO 5" },
  { key: 3, label: "Ovulation Test" },
  { key: 4, label: "Help Me, I am trapped in here" },
];

export const Activity = (props) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ActivityCard chipData={chipData} />
    </section>
  );
};
