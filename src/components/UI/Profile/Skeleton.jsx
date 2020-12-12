import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Skeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: " center",
                margin: "15px",
              }}
            >
              <div style={{ display: "flex", alignItems: " center" }}>
                <Avatar
                  variant="rounded"
                  className={classes.large}
                  style={{ alignSelf: "center" }}
                ></Avatar>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    margin: "10px",
                  }}
                >
                  <Typography
                    align="center"
                    color="primary"
                    variant="h6"
                    component="h6"
                  ></Typography>
                  <Typography
                    align="left"
                    color="primary"
                    variant="h6"
                    component="h6"
                    style={{ fontSize: "12px" }}
                  ></Typography>
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Skeleton;
