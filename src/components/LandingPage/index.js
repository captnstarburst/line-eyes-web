import React, { useState } from "react";
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
// import TagDrawer from "../UI/TagDrawer";
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
  const [tagDrawerOpen, setTagDrawerOpen] = useState(false);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Pregnancy Test", viewing: true },
    { key: 1, label: "Ovulation Test", viewing: false },
    { key: 2, label: "Clear Blue", viewing: false },
    { key: 3, label: "First Response", viewing: false },
    { key: 4, label: "Clinical Guard", viewing: false },
    { key: 5, label: "Generic Brand", viewing: false },
    { key: 6, label: "3 DPO", viewing: false },
    { key: 7, label: "4 DPO", viewing: false },
    { key: 8, label: "5 DPO", viewing: false },
    { key: 9, label: "6 DPO", viewing: false },
    { key: 10, label: "7 DPO", viewing: false },
    { key: 11, label: "8 DPO", viewing: false },
    { key: 12, label: "9 DPO", viewing: false },
    { key: 13, label: "10 DPO", viewing: false },
    { key: 14, label: "11 DPO", viewing: false },
    { key: 15, label: "12 DPO", viewing: false },
    { key: 16, label: "13 DPO", viewing: false },
    { key: 17, label: "14 DPO", viewing: false },
    { key: 18, label: "15 DPO", viewing: false },
    { key: 19, label: "16 DPO", viewing: false },
    { key: 20, label: "17 DPO", viewing: false },
    { key: 21, label: "18 DPO", viewing: false },
    { key: 22, label: "19 DPO", viewing: false },
    { key: 23, label: "20 DPO", viewing: false },
    { key: 24, label: "1 DPT", viewing: false },
    { key: 25, label: "2 DPT", viewing: false },
    { key: 26, label: "3 DPT", viewing: false },
    { key: 27, label: "4 DPT", viewing: false },
    { key: 28, label: "5 DPT", viewing: false },
    { key: 29, label: "6 DPT", viewing: false },
    { key: 30, label: "7 DPT", viewing: false },
    { key: 31, label: "8 DPT", viewing: false },
    { key: 32, label: "10 DPT", viewing: false },
    { key: 33, label: "11 DPT", viewing: false },
    { key: 34, label: "12 DPT", viewing: false },
    { key: 35, label: "13 DPT", viewing: false },
    { key: 36, label: "14 DPT", viewing: false },
    { key: 37, label: "15 DPT", viewing: false },
    { key: 38, label: "16 DPT", viewing: false },
  ]);

  const handleRouteToPhotoPage = () => {
    props.history.push(ROUTES.PHOTO);
  };

  const propagateSelection = (selected) => setSelection(selected);

  const handleChipChange = (chipToDelete) => {
    let copy = chipData.map((data) => {
      if (data.key === chipToDelete) {
        return { key: data.key, label: data.label, viewing: !data.viewing };
      } else {
        return data;
      }
    });

    if (!tagDrawerOpen) setTagDrawerOpen(true);
    setChipData(copy);
  };

  const toggleDrawer = React.useCallback(
    () => setTagDrawerOpen((state) => !state),
    []
  );

  return (
    <>
      <AppBar />
      <CssBaseline />
      <Container fixed>
        {/* <TagDrawer
          chipData={chipData}
          propagateChipChange={handleChipChange}
          open={tagDrawerOpen}
          toggle={toggleDrawer}
        /> */}
        <Typography component="main" className={classes.Main}>
          <Chips
            chipData={chipData}
            margin
            deletable
            propagateChipChange={handleChipChange}
          />
          <div style={{ position: "relative" }}>
            {/* THATS IT FOR NOW */}
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
