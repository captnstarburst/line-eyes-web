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
import { withFirebase } from "../../../Firebase";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  navigation: {
    width: 500,
  },
});

const ActivityCard = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpenClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuOptionClick = () => {
    if (props.owner) {
      handleDelete();
      handleClose();
    } else {
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const storageRef = props.firebase.getStorage();
    const uid = props.firebase.currentUserUID();
    const testRef = storageRef.child(
      "Tests/" + uid + "/" + props.uploadData.file_name
    );

    // Delete the file
    testRef
      .delete()
      .then(() => {
        props.onImageDelete();
      })
      .catch((err) => {
        // Uh-oh, an error occurred!
      });
  };

  return (
    <Fade in={true} {...{ timeout: 1000 }}>
      <Paper
        elevation={0}
        style={{
          backgroundColor: "#cfe8fc",
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <Card className={classes.root}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              aria-label="image options"
              onClick={handleMenuOpenClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="image_menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleMenuOptionClick}>
                {props.owner ? "Delete" : "Report Image"}
              </MenuItem>
            </Menu>
          </div>
          <CardMedia
            component="img"
            alt={
              props.uploadData.reported
                ? "Uploaded reported and is under review"
                : "test " + props.uploadData.file_name
            }
            height="200"
            image={props.uploadData.reported ? null : props.uploadData.url}
            title={
              props.uploadData.reported
                ? "Uploaded reported and is under review"
                : "test " + props.uploadData.file_name
            }
            style={{ objectFit: "fill" }}
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

export default withFirebase(ActivityCard);
