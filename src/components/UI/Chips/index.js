import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

/*
  This component displays a list of Chips passed as props. Individual chips may be deletable or not.

  Props:
  `chipData` - An array of object that contain the chip data; 
    + Should be a unique key and string to label the indiviual chip 
  `deletable` - When added inidividual chips have the deletable UI
  `margin` - When added the default margin will be added to the list of chips 
    
  Optional Props:
  `handleDelete` - A function that will handle removing the chip data passed to this component

Example of Component:
    <Chips
        chipData = {[{key: 1, label: "chip 1"}]}
        margin
        deleteable 
        handleDelete = {() => {}}
    />
*/

const useStyles = makeStyles((theme) => ({
  rootWithNoMargin: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  rootWithMargin: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    marginTop: "-200px",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Chips = (props) => {
  const classes = useStyles();

  return (
    <Paper
      component="ul"
      elevation={0}
      className={
        props.margin ? classes.rootWithMargin : classes.rootWithNoMargin
      }
    >
      {props.deletable ? (
        <>
          {props.chipData.map((data) => {
            return (
              <li key={data.key}>
                <Chip
                  label={data.label}
                  className={classes.chip}
                  onDelete={props.handleDelete(data)}
                />
              </li>
            );
          })}
        </>
      ) : (
        <>
          {props.chipData.map((data) => {
            return (
              <li key={data.key}>
                <Chip label={data.label} className={classes.chip} />
              </li>
            );
          })}
        </>
      )}
    </Paper>
  );
};

export default Chips;
