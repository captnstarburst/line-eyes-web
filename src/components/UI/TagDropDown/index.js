import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    e.persist();
    props.propagateChipSelection(e.currentTarget.id);
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls={props.tagData[0].id}
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        {props.tagData[0].header.split("_").join(" ")}
      </Button>
      <StyledMenu
        id={props.tagData[0].id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.tagData.map((data) => {
          if (data.header) return null;
          return (
            <StyledMenuItem key={data.key}>
              <ListItemText
                id={data.label}
                onClick={handleClick}
                primary={data.label.split("_").join(" ")}
              />
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
}
