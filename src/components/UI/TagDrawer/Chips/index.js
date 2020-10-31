import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    maxHeight: "200px",
    overflowY: "scroll",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const TagDrawerChips = (props) => {
  const classes = useStyles();

  return (
    <Paper component="ul" className={classes.root} elevation={0}>
      {props.chipData.map((data) => {
        if (!data.viewing) {
          return (
            <li key={data.key}>
              <Chip
                label={data.label}
                onClick={() => props.propagateChipChange(data.key)}
                onDelete={() => props.propagateChipChange(data.key)}
                deleteIcon={<ExpandMoreIcon />}
                className={classes.chip}
              />
            </li>
          );
        } else {
          return null;
        }
      })}
    </Paper>
  );
};
