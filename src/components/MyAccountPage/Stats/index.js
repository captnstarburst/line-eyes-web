import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import PieChart from "./PieChart";
import NoMoreCard from "../../UI/Cards/NoMoreCard";
import { withFirebase } from "../../Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "14px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Stats = (props) => {
  const [uploadedNumber, setUploadedNumber] = useState(0);
  const [testsReviewed, setTestsReviewed] = useState(0);
  const [latestResults, setLatestResults] = useState([
    { name: "invalid", value: 600 },
    { name: "negative", value: 200 },
    { name: "positive", value: 300 },
  ]);

  useEffect(() => {
    const firestore = props.firebase.getFirestore();
    const uid = props.firebase.currentUserUID();

    firestore
      .doc("Stats/" + uid)
      .get()
      .then((doc) => {
        setUploadedNumber(doc.data().uploaded_tests);
        setTestsReviewed(doc.data().reviewed_tests);
        // setLatestResults({
        //   invalid: doc.data().last_upload_results.invalid,
        //   negative: doc.data().last_upload_results.negative,
        //   positive: doc.data().last_upload_results.positive,
        // });
      })
      .catch((err) => {
        //handle Erro
      });
  }, [props.firebase]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Grid item xs={6} sm={3}>
          <Grow in={true}>
            <Paper className={classes.paper}>
              <Typography
                align="center"
                color="primary"
                variant="h6"
                component="h6"
              >
                Tests Uploaded
              </Typography>
              <Typography
                align="center"
                color="secondary"
                variant="p"
                component="p"
              >
                {uploadedNumber}
              </Typography>
            </Paper>
          </Grow>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Grow in={true} {...{ timeout: 1000 }}>
            <Paper className={classes.paper}>
              <Typography
                align="center"
                color="primary"
                variant="h6"
                component="h6"
              >
                Tests Reviewed
              </Typography>
              <Typography
                align="center"
                color="secondary"
                variant="p"
                component="p"
              >
                {testsReviewed}
              </Typography>
            </Paper>
          </Grow>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Grow in={true} {...{ timeout: 2000 }}>
            <Paper className={classes.paper}>
              <Typography
                align="center"
                color="primary"
                variant="h6"
                component="h6"
              >
                Most Recent Upload
              </Typography>
              {/* <PieChart results={latestResults} /> */}
              <NoMoreCard />
            </Paper>
          </Grow>
        </Grid>
      </Grid>
    </div>
  );
};

export default withFirebase(Stats);
