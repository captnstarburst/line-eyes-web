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

export default function ChipsArray() {
  const classes = useStyles();
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

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper component="ul" className={classes.root} elevation={0}>
      {chipData.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              label={data.label}
              onDelete={handleDelete}
              deleteIcon={<ExpandMoreIcon />}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
