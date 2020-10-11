import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import QueueIcon from '@material-ui/icons/Queue';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { withFirebase } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

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
    width: 'auto',
  },
}));

const MenuAppBar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleRouteToMyAccount = () => {
    handleClose();
    props.history.push(ROUTES.My_Account);
  }

  const handleRouteToLineEyes = () => {
    handleClose();
    props.history.push(ROUTES.LANDING);
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button onClick={handleRouteToMyAccount} >
            <ListItemIcon> <AccountCircle /> </ListItemIcon>
            <ListItemText primary={"My Account"} />
          </ListItem>
          <ListItem button >
            <ListItemIcon> <AddAPhotoIcon /> </ListItemIcon>
            <ListItemText primary={"Add Photo"} />
          </ListItem>
          <ListItem button onClick={handleRouteToLineEyes} >
            <ListItemIcon> <QueueIcon /> </ListItemIcon>
            <ListItemText primary={"Line-Eyes"} />
          </ListItem>
      </List>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <SettingsApplicationsIcon/> 
        </ListItemIcon>
        <ListItemText primary={"Settings"} />
      </ListItem>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer("left", true)} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Line-Eyes
          </Typography>
            <div>
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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
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
      <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
      </Drawer>
    </div>
  );
}

const ComposedMenuAppBar = compose(
  withRouter,
  withFirebase,
)(MenuAppBar);

export default withFirebase(ComposedMenuAppBar)
