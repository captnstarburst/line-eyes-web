import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const SaveToast = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.saved) {
      setOpen(true);
    }
  }, [props.saved]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        Information updated, successfully
      </Alert>
    </Snackbar>
  );
};

export default SaveToast;
