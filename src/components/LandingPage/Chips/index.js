import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";

const useStyles = makeStyles((theme) => ({
  root: {
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
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Pregnancy Test" },
    { key: 1, label: "Clear Blue" },
    { key: 2, label: "DPO 5" },
    { key: 3, label: "Ovulation Test" },
    { key: 4, label: "Help Me, I am trapped in here" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
};

export default Chips;
