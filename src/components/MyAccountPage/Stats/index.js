import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import PieChart from "./PieChart";

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

export const Stats = () => {
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
                0
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
                0
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
              <PieChart />
            </Paper>
          </Grow>
        </Grid>
      </Grid>
    </div>
  );
};
