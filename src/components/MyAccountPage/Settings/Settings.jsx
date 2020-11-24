import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "50px",
    paddingBottom: "100px",
  },
  list: {
    width: "100%",
    maxWidth: 500,
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
}));

const Settings = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        subheader={<ListSubheader disableSticky>Personal Info</ListSubheader>}
        className={classes.list}
      >
        <ListItem className={classes.paper}>
          <ListItemIcon>
            <Avatar>{sessionStorage.getItem("avatar")}</Avatar>
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Profile Picture" />
          <ListItemSecondaryAction>
            <Button variant="contained" color="primary">
              Upload
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText id="first_name_text" primary="First Name" />
          <ListItemSecondaryAction>
            <TextField
              id="first_name"
              label="First Name"
              variant="outlined"
              value={props.userInfo.first_name}
              onChange={props.propagateUpdate}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText id="last_name_text" primary="Last Name" />
          <ListItemSecondaryAction>
            <TextField
              id="last_name"
              label="Last Name"
              variant="outlined"
              value={props.userInfo.last_name}
              onChange={props.propagateUpdate}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText id="birthday_text" primary="Birthday" />
          <ListItemSecondaryAction>
            {props.userInfo.birthdate && (
              <TextField
                variant="outlined"
                id="birthdate"
                label="Date Of Birth"
                type="date"
                defaultValue={props.userInfo.birthdate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={props.propagateUpdate}
              />
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader disableSticky>Notification Settings</ListSubheader>
        }
        className={classes.list}
      >
        <ListItem className={classes.paper}>
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-push-notifications"
            primary="Push Notifications"
          />
          <ListItemSecondaryAction>
            <Switch
              id="push_notifications"
              edge="end"
              color="primary"
              onChange={props.propagateToggle}
              checked={props.userInfo.push_notifications}
              inputProps={{
                "aria-labelledby": "switch-list-label-push-notifications",
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-email-notifications"
            primary="Email Notifications"
          />
          <ListItemSecondaryAction>
            <Switch
              id="email_notifications"
              edge="end"
              color="primary"
              onChange={props.propagateToggle}
              checked={props.userInfo.email_notifications}
              inputProps={{
                "aria-labelledby": "switch-list-label-email-notifications",
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader disableSticky>Account Settings</ListSubheader>
        }
        className={classes.list}
      >
        <ListItem className={classes.paper}>
          <ListItemText id="email_text" primary="Email Address" />
          <ListItemSecondaryAction>
            {props.userInfo.email && (
              <TextField
                id="email"
                label={props.userInfo.email}
                variant="outlined"
                onChange={props.propagateUpdate}
              />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText id="password_text" primary="Change Password" />
          <ListItemSecondaryAction>
            <TextField
              id="new_password"
              label="New Password"
              variant="outlined"
              type="password"
              onChange={props.propagateUpdate}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText id="display_name_text" primary="Change User Name" />
          <ListItemSecondaryAction>
            <TextField
              id="outlined-basic"
              label={props.userInfo.display_name}
              variant="outlined"
              onChange={props.propagateUpdate}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%" }}
          >
            Delete Account
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

export default Settings;
