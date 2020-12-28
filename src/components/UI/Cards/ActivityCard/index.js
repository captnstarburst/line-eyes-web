import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chips from "../../Chips";
import Typography from "@material-ui/core/Typography";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import MinimizeIcon from "@material-ui/icons/Minimize";
import WarningIcon from "@material-ui/icons/Warning";
import Fade from "@material-ui/core/Fade";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  navigation: {
    width: 500,
  },
});

export const ActivityCard = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fade in={true} {...{ timeout: 1000 }}>
      <Paper elevation={3} variant="outlined">
        <Card className={classes.root}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Report Image</MenuItem>
            </Menu>
          </div>
          <CardMedia
            component="img"
            alt={"test " + props.uploadData.file_name}
            height="140"
            image={props.uploadData.url}
            title={"test " + props.uploadData.file_name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${props.userData.display_name} ${props.uploadData.formattedDate}`}
            </Typography>

            <Chips chipData={props.uploadData.formattedTags} />
          </CardContent>
          <CardActions>
            <BottomNavigation
              // value={0}
              showLabels
              className={classes.navigation}
            >
              <BottomNavigationAction
                label="Negative"
                icon={
                  <Badge
                    color="primary"
                    badgeContent={props.uploadData.negatives}
                    invisible={false}
                  >
                    <MinimizeIcon
                      style={{
                        transform: "rotate(90deg)",
                        marginLeft: "10%",
                      }}
                    />
                  </Badge>
                }
              />
              <BottomNavigationAction
                label="Invalid"
                icon={
                  <Badge
                    color="primary"
                    badgeContent={props.uploadData.invalids}
                    invisible={false}
                  >
                    {" "}
                    <WarningIcon />
                  </Badge>
                }
              />
              <BottomNavigationAction
                label="Positive"
                icon={
                  <Badge
                    color="primary"
                    badgeContent={props.uploadData.positives}
                    invisible={false}
                  >
                    <DragHandleIcon style={{ transform: "rotate(90deg)" }} />
                  </Badge>
                }
              />
            </BottomNavigation>
          </CardActions>
        </Card>
      </Paper>
    </Fade>
  );
};
