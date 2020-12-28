import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import MinimizeIcon from "@material-ui/icons/Minimize";
import WarningIcon from "@material-ui/icons/Warning";
import Fade from "@material-ui/core/Fade";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import TagDrawerJSX from "../../UI/TagDrawer/TagDrawer.jsx";
import Chips from "../../UI/Chips";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  navigation: {
    width: 500,
  },
}));

const ReviewJSX = (props) => {
  const classes = useStyles();

  return (
    <Container fixed>
      <TagDrawerJSX
        chipData={props.chipData}
        propagateChipSelection={props.handleChipSelection}
        open={props.tagDrawerOpen}
        toggle={props.toggleDrawer}
      />
      <Typography
        component="main"
        style={{
          backgroundColor: "#cfe8fc",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <Chips
          chipData={props.chipData}
          margin
          deletable
          propagateChipDeletion={props.handleChipDeletion}
        />

        <Fade in={true} {...{ timeout: 1000 }}>
          <Paper elevation={3} variant="outlined">
            <Card className={classes.root}>
              <CardMedia
                component="img"
                alt="pending upload"
                height="140"
                image={props.url}
                title="pending upload"
              />

              <CardActions>
                <BottomNavigation
                  value={0}
                  showLabels
                  className={classes.navigation}
                >
                  <BottomNavigationAction
                    label="Negative"
                    icon={
                      <Badge
                        color="secondary"
                        badgeContent={0}
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
                        color="secondary"
                        badgeContent={0}
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
                        color="secondary"
                        badgeContent={0}
                        invisible={false}
                      >
                        <DragHandleIcon
                          style={{ transform: "rotate(90deg)" }}
                        />
                      </Badge>
                    }
                  />
                </BottomNavigation>
              </CardActions>
            </Card>
          </Paper>
        </Fade>

        <Zoom in={props.mountUpload} {...{ timeout: 500 }} unmountOnExit>
          <Fab
            aria-label={"fab.label"}
            className={classes.fab}
            variant="extended"
            color={"primary"}
            onClick={props.handleUpload}
          >
            Upload <CloudUploadIcon style={{ marginLeft: "10px" }} />
          </Fab>
        </Zoom>
      </Typography>
    </Container>
  );
};

export default ReviewJSX;
