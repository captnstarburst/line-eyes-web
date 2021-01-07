import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chips from "../../Chips";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  navigation: {
    width: 500,
  },
});

export const AdminCard = (props) => {
  const classes = useStyles();

  const [asyncWork, setAsyncWork] = useState(false);

  const doingAsync = () => setAsyncWork(true);

  const handleDeleteClick = () => {
    doingAsync();
    props.markForDeletion(props.test.docId);
  };

  const handleAllGoodClick = () => {
    doingAsync();
    props.markAllGood(props.test.docId);
  };

  return (
    <Fade in={true} {...{ timeout: 1000 }}>
      <Paper
        elevation={3}
        variant="outlined"
        style={{
          backgroundColor: "#cfe8fc",
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <Card className={classes.root}>
          <CardMedia
            component="img"
            alt="reported test"
            height="140"
            image={props.test.url}
            title="reported test"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.test.uploaded_by} {props.test.uploaded}
            </Typography>
            <Chips chipData={props.test.chipData} />
          </CardContent>
          <CardActions>
            <BottomNavigation
              value={0}
              showLabels
              className={classes.navigation}
            >
              <BottomNavigationAction
                label="Mark For Deletion"
                icon={
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteClick}
                    disabled={asyncWork}
                  >
                    <DeleteForeverIcon />
                  </Button>
                }
              />

              <BottomNavigationAction
                label="All Good"
                icon={
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAllGoodClick}
                    disabled={asyncWork}
                  >
                    <CheckCircleIcon />
                  </Button>
                }
              />
            </BottomNavigation>
          </CardActions>
        </Card>
      </Paper>
    </Fade>
  );
};
