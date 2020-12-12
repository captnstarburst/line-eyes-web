import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  navigation: {
    width: 500,
  },
});

export const NoMoreCard = (props) => {
  const classes = useStyles();

  return (
    <Fade in={true} {...{ timeout: 1000 }}>
      <Paper elevation={3} variant="outlined">
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h4" component="h2">
              nothing here ...
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Fade>
  );
};
