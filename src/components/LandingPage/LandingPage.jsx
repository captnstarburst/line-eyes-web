import React from "react";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Dragger from "./Draggable";
import { Toast } from "../UI/Toasts/UndoToast";
import Chips from "../UI/Chips";
import AppBar from "../UI/AppBar";
import TagDrawerJSX from "../UI/TagDrawer/TagDrawer.jsx";
import LoadingCard from "../UI/Cards/LoadingCard";
import NoMoreCard from "../UI/Cards/NoMoreCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Main: {
    backgroundColor: "#cfe8fc",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    overflowX: "hidden",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const LandingPageJSX = (props) => {
  const classes = useStyles();

  return (
    <>
      <AppBar />
      <CssBaseline />
      <Container fixed>
        <TagDrawerJSX
          chipData={props.chipData}
          propagateChipSelection={props.handleChipSelection}
          open={props.tagDrawerOpen}
          toggle={props.toggleDrawer}
        />
        <Typography component="main" className={classes.Main}>
          <Chips
            chipData={props.chipData}
            margin
            deletable
            propagateChipDeletion={props.handleChipDeletion}
          />
          {props.loading ? (
            <LoadingCard />
          ) : !props.noMoreTests && props.tests[0] ? (
            <div style={{ position: "relative" }}>
              <Dragger
                propagateSelection={props.propagateSelection}
                loading={props.loading}
                tests={props.tests}
              />
            </div>
          ) : (
            <NoMoreCard />
          )}

          <Toast userSelection={props.selection} />
          <Zoom in={true} {...{ timeout: 500 }} unmountOnExit>
            <Fab
              aria-label={"Add Photo"}
              className={classes.fab}
              onClick={props.handleRouteToPhotoPage}
            >
              <AddIcon color={"primary"} />
            </Fab>
          </Zoom>
        </Typography>
      </Container>
    </>
  );
};

export default LandingPageJSX;
