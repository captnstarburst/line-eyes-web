import React from "react";
import TextField from "@material-ui/core/TextField";

/*
  This component displays the log in form. A text field for username/email and a text field for password
  
  Props:
  `propagateChange` - A function that handles changes to the fields 
  `errorText` - Helper text value for field errors 

  Optional:
  `readOnly` - When included the username field is readOnly and populated from session storage

Example of Component:
    <LogInJSX
        propagateChange = {(e) => setValue(e.target.value)}
        errorText = "Incorrect Password"
    />
*/

const LogInJSX = (props) => {
  return (
    <>
      <TextField
        disabled={props.readOnly}
        variant="outlined"
        id="username"
        label="User Name or Email"
        type="text"
        defaultValue={props.readOnly ? props.display_name : null}
        onChange={props.propagateChange}
        error={props.errorText}
        helperText={props.errorText ? props.errorText : null}
      />
      <TextField
        variant="outlined"
        id="password"
        label="Password"
        type="password"
        onChange={props.propagateChange}
        error={props.errorText}
        helperText={props.errorText ? props.errorText : null}
      />
    </>
  );
};

export default LogInJSX;
