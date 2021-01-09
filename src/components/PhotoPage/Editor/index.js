import React from "react";
import "./tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core/styles";

const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "transparent",
  "downloadButton.display": "none",
};

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    backgroundColor: "white",
    border: "1px solid #fdba3b",
    borderTopColor: "rgb(253, 186, 59)",
    borderRightColor: "rgb(253, 186, 59)",
    borderBottomColor: "rgb(253, 186, 59)",
    borderLeftColor: "rgb(253, 186, 59)",
    borderColor: "white",
    marginRight: "40px",
    marginTop: "10px",
  },
}));

function Editor(props) {
  const classes = useStyles();

  const { height, width } = useWindowDimensions();

  const imageEditor = React.createRef();

  const currentImgToURL = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    props.propagateUrl(data);
  };

  return (
    <Container style={{ background: "#151515" }} maxWidth="xl">
      <section style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          variant="contained"
          color={"green"}
          size="large"
          startIcon={<SaveIcon />}
          onClick={currentImgToURL}
          className={classes.buttonStyle}
        >
          Save
        </Button>
      </section>

      <ImageEditor
        includeUI={{
          theme: myTheme,
          menu: ["filter"],
          initMenu: "filter",
          uiSize: {
            height: "100vh",
          },
          menuBarPosition: width < 600 ? "bottom" : "top",
        }}
        cssMaxHeight={height}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
        ref={imageEditor}
      />
    </Container>
  );
}

export default Editor;
