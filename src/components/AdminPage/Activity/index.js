import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AdminCard } from "../../UI/Cards/AdminCard";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px",
  },
});

const chipData = [
  { key: 0, label: "Pregnancy Test", viewing: true },
  { key: 1, label: "Ovulation Test", viewing: false },
  { key: 2, label: "Clear Blue", viewing: false },
  { key: 3, label: "First Response", viewing: false },
  { key: 4, label: "Clinical Guard", viewing: false },
];
export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <AdminCard chipData={chipData} />
    </section>
  );
}
