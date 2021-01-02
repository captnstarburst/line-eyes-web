import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  navigation: {
    width: 500,
  },
});

const LoadingCard = (props) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      style={{
        backgroundColor: "#cfe8fc",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card className={classes.root}>
        <CardContent
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
          <CircularProgress />
        </CardContent>
      </Card>
    </Paper>
  );
};

export default LoadingCard;
