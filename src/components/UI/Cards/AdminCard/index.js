import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chips from "../../Chips";
import Typography from "@material-ui/core/Typography";
import PregnancyTest from "../../../assets/pregnancy-test.png";
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

  return (
    <Fade in={true} {...{ timeout: 1000 }}>
      <Paper elevation={3} variant="outlined">
        <Card className={classes.root}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={PregnancyTest}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              User Name 10/12/2020
            </Typography>
            <Chips chipData={props.chipData} />
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
                  <Button variant="contained" color="secondary">
                    <DeleteForeverIcon />
                  </Button>
                }
              />

              <BottomNavigationAction
                label="All Good"
                icon={
                  <Button variant="contained" color="primary">
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
