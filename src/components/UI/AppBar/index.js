import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import QueueIcon from "@material-ui/icons/Queue";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import Badge from "@material-ui/core/Badge";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import clsx from "clsx";
import { withFirebase } from "../../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

const MenuAppBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [role, setRole] = useState("");

  useEffect(() => {
    async function IIFE() {
      const role = await props.firebase.getRole();
      setRole(role);
    }
    IIFE();
  }, [props.firebase]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleRouteToMyAccount = () => {
    handleClose();
    props.history.push(ROUTES.My_Account + "/stats");
  };

  const handleRouteToPhotoEdit = () => {
    handleClose();
    props.history.push(ROUTES.PHOTO);
  };

  const handleRouteToLineEyes = () => {
    handleClose();
    props.history.push(ROUTES.LANDING);
  };

  const handleRouteToSettings = () => {
    handleClose();
    props.history.push(ROUTES.My_Account + "/settings");
  };

  const handleRouteToPrivacy = () => {
    handleClose();
    props.history.push(ROUTES.PRIVACY);
  };

  const handleRouteToAdmin = () => {
    handleClose();
    props.history.push(ROUTES.ADMIN);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={handleRouteToMyAccount}>
          <ListItemIcon>
            {" "}
            <AccountCircle />{" "}
          </ListItemIcon>
          <ListItemText primary={"My Account"} />
        </ListItem>
        <ListItem button onClick={handleRouteToPhotoEdit}>
          <ListItemIcon>
            {" "}
            <AddAPhotoIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Add Photo"} />
        </ListItem>
        <ListItem button onClick={handleRouteToLineEyes}>
          <ListItemIcon>
            {" "}
            <QueueIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Line-Eyes"} />
        </ListItem>
        {role === "Admin" && (
          <ListItem button onClick={handleRouteToAdmin}>
            <ListItemIcon>
              {" "}
              <SupervisorAccountIcon />{" "}
            </ListItemIcon>
            <ListItemText primary={"Admin"} />
          </ListItem>
        )}
      </List>
      <Divider />
      <ListItem button onClick={handleRouteToSettings}>
        <ListItemIcon>
          <SettingsApplicationsIcon />
        </ListItemIcon>
        <ListItemText primary={"Settings"} />
      </ListItem>
      <ListItem button onClick={handleRouteToPrivacy}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary={"Privacy Policy"} />
      </ListItem>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={toggleDrawer("left", true)}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Line-Eyes
          </Typography>
          <div>
            <IconButton
              aria-label="notficiations"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Badge color="secondary" badgeContent={1} invisible={true}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleRouteToMyAccount}>My Account</MenuItem>
              <MenuItem onClick={props.firebase.doSignOut}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

const ComposedMenuAppBar = compose(withRouter, withFirebase)(MenuAppBar);

export default ComposedMenuAppBar;
