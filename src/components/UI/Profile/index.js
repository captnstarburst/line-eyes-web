import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SetStorage from "../../functions/SessionStorage";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../Firebase";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

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

const Profile = (props) => {
  const classes = useStyles();

  useEffect(() => {
    if (
      !sessionStorage.getItem("display_name") ||
      !sessionStorage.getItem("first_name") ||
      !sessionStorage.getItem("last_name") ||
      !sessionStorage.getItem("profile_pic")
    ) {
      const firestore = props.firebase.getFirestore();
      const uid = props.firebase.currentUserUID();

      firestore
        .doc("Users/" + uid)
        .get()
        .then((doc) => {
          SetStorage("display_name", doc.data().display_name);
          SetStorage("first_name", doc.data().first_name);
          SetStorage("last_name", doc.data().last_name);
          SetStorage("profile_pic", doc.data().profile_pic);
        });
    }
  }, []);

  const handleRouteToSettings = () => {
    props.history.push(ROUTES.My_Account + "/settings");
  };

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
                  src={
                    sessionStorage.getItem("profile_pic") ? (
                      sessionStorage.getItem("profile_pic")
                    ) : (
                      <AccountCircle className={classes.large} />
                    )
                  }
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
                  >
                    {sessionStorage.getItem("first_name") &&
                      sessionStorage.getItem("last_name") &&
                      sessionStorage.getItem("first_name") +
                        sessionStorage.getItem("last_name")}
                  </Typography>
                  <Typography
                    align="left"
                    color="primary"
                    variant="h6"
                    component="h6"
                    style={{ fontSize: "12px" }}
                  >
                    {sessionStorage.getItem("display_name")}
                  </Typography>
                </div>
              </div>
              {props.edit && (
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ height: "40px" }}
                  onClick={handleRouteToSettings}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const ComposedProfile = compose(withRouter, withFirebase)(Profile);

export default withRouter(ComposedProfile);
