import React, { useState } from "react";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Dragger from "./Draggable";
import { Toast } from "./Toast";
import Chips from "../UI/Chips";
import AppBar from "../UI/AppBar";
import TagDrawer from "../UI/TagDrawer";
import * as ROUTES from "../constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import { withAuthorization } from "../Session";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

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

const Landing = (props) => {
  const classes = useStyles();

  const [selection, setSelection] = useState(null);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Pregnancy Test" },
    { key: 1, label: "Clear Blue" },
    { key: 2, label: "DPO 5" },
    { key: 3, label: "Ovulation Test" },
    { key: 4, label: "Help Me, I am trapped in here" },
  ]);

  const handleRouteToPhotoPage = () => {
    props.history.push(ROUTES.PHOTO);
  };

  const propagateSelection = (selected) => setSelection(selected);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <>
      <AppBar />
      <CssBaseline />
      <Container fixed>
        <TagDrawer />
        <Typography component="main" className={classes.Main}>
          <Chips
            chipData={chipData}
            margin
            deletable
            handleDelete={handleDelete}
          />
          <div style={{ position: "relative" }}>
            <Dragger propagateSelection={propagateSelection} />
          </div>
          <Toast userSelection={selection} />
          <Zoom in={true} {...{ timeout: 500 }} unmountOnExit>
            <Fab
              aria-label={"Add Photo"}
              className={classes.fab}
              onClick={handleRouteToPhotoPage}
            >
              <AddIcon color={"primary"} />
            </Fab>
          </Zoom>
        </Typography>
      </Container>
    </>
  );
};

const condition = (authUser) => !!authUser;

const ComposedLanding = compose(withRouter, withFirebase)(Landing);

export default withAuthorization(condition)(ComposedLanding);
