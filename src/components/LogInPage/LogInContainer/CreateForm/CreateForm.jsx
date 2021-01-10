import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        width: "30ch",
      },
    },
  },
}));

const CreateForm = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        variant="outlined"
        id="email"
        label="Email"
        type="email"
        onChange={props.propagateChange}
        error={props.checkingValues && props.formError.email}
        helperText={
          props.checkingValues && props.formError.email
            ? props.errorText.emailErrorText
            : null
        }
      />
      <TextField
        variant="outlined"
        id="username"
        label="User Name"
        type="text"
        onChange={props.propagateChange}
        error={props.checkingValues && props.formError.username}
        helperText={
          props.checkingValues && props.formError.username
            ? "username already exists"
            : null
        }
      />
      <TextField
        variant="outlined"
        id="password"
        label="Password"
        type="password"
        onChange={props.propagateChange}
        error={props.checkingValues && props.formError.password}
        helperText={
          props.checkingValues && props.formError.password
            ? props.errorText.passwordErrorText
            : null
        }
      />
      <TextField
        variant="outlined"
        id="password_check"
        label="Re-Enter Password"
        type="password"
        onChange={props.propagateChange}
        error={props.checkingValues && props.formError.password}
        helperText={
          props.checkingValues && props.formError.password
            ? props.errorText.passwordErrorText
            : null
        }
      />
      <TextField
        variant="outlined"
        id="dateOfBirth"
        label="Date Of Birth"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={props.defaultDate}
        onChange={props.propagateChange}
        error={props.checkingValues && props.formError.dateOfBirth}
        helperText={
          props.checkingValues && props.formError.dateOfBirth
            ? "You must be at least 13 years of age"
            : null
        }
      />

      <Button
        variant="contained"
        color="primary"
        endIcon={props.asyncWork ? <CircularProgress /> : <AccountCircleIcon />}
        style={{ width: "95%" }}
        onClick={props.propagateCreateClick}
      >
        Create Account
      </Button>
    </form>
  );
};

export default CreateForm;
