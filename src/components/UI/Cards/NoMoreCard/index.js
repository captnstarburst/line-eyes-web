import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    [theme.breakpoints.between("xs", "sm")]: {
      maxWidth: 250,
    },
    [theme.breakpoints.only("sm")]: {
      maxWidth: 400,
    },
  },
  navigation: {
    width: 500,
    [theme.breakpoints.between("xs", "sm")]: {
      maxWidth: 250,
    },
    [theme.breakpoints.only("sm")]: {
      maxWidth: 400,
    },
  },
}));

const NoMoreCard = (props) => {
  const classes = useStyles();

  return (
    <Zoom in={true} {...{ timeout: 1500 }} unmountOnExit>
      <Card
        className={classes.root}
        style={{
          width: "500px",
          height: "200px",
          backgroundColor: "#cfe8fc",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h2">
          That's all for now.
        </Typography>
      </Card>
    </Zoom>
  );
};

export default NoMoreCard;
