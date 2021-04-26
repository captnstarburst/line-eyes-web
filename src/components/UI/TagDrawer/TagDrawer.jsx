import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Grid from "@material-ui/core/Grid";
import TagDropDown from "../TagDropDown";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const TagDrawerJSX = (props) => {
  const classes = useStyles();

  console.log(props.chipData);
  return (
    <Accordion square expanded={props.open} onChange={props.toggle}>
      <AccordionSummary aria-controls="Tag-Content" id="Tag-Header">
        <Typography
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <DoubleArrowIcon
            style={{
              transform: props.open ? "rotate(-90deg)" : "rotate(90deg)",
            }}
          />
        </Typography>
      </AccordionSummary>
      <AccordionDetails id="Tag-Content">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {props.chipData.map((data, index) => {
                return (
                  <Grid item key={data[0].id}>
                    <TagDropDown
                      tagData={data}
                      propagateChipSelection={props.propagateChipSelection}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        {/* <Tags
          chipData={props.chipData}
          propagateSelection={props.propagateChipSelection}
        /> */}
      </AccordionDetails>
    </Accordion>
  );
};

export default TagDrawerJSX;
