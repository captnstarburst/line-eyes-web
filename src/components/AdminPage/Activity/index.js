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

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <AdminCard />
    </section>
  );
}
