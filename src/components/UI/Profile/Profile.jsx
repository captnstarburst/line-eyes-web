import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
                    props.userData.profile_pic ? (
                      props.userData.profile_pic
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
                    {props.userData.first_name &&
                      props.userData.last_name &&
                      props.userData.first_name +
                        " " +
                        props.userData.last_name}
                  </Typography>
                  <Typography
                    align="left"
                    color="primary"
                    variant="h6"
                    component="h6"
                    style={{ fontSize: "12px" }}
                  >
                    {props.userData.display_name}
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
