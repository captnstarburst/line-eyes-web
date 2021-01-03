import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import LogInContainer from "./LogInContainer";
import Footer from "../UI/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "linear-gradient(4deg, rgba(34,193,195,1) 0%, rgba(0,112,26,1) 100%)",
    height: "120vh",
    flexGrow: 1,
  },
  logInContainer: {
    height: "auto",
    marginTop: "5vh",
    minWidth: "500px",
    maxWidth: "70vw",
  },
}));

const LogInPage = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        xl={12}
      >
        <Paper elevation={24} className={classes.logInContainer}>
          <LogInContainer />
        </Paper>
      </Grid>
      <Footer />
    </main>
  );
};

export default LogInPage;
