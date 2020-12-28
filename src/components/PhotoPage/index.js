import React, { useState } from "react";
import AppBar from "../UI/AppBar";
import Editor from "./Editor";
import Review from "./Review";
import { Switch, Route, withRouter } from "react-router-dom";
import { withAuthorization } from "../Session";
import { compose } from "recompose";

const PhotoPage = (props) => {
  const [base64, setBase64] = useState();

  const incrementNext = (url) => {
    setBase64(url);
    props.history.push("/upload-photo/review");
  };

  return (
    <>
      <AppBar />
      <Switch>
        <Route
          path={`/upload-photo`}
          exact
          component={() => <Editor propagateUrl={incrementNext} />}
        />
        <Route
          path={`/upload-photo/review`}
          exact
          component={() => <Review url={base64} />}
        />
      </Switch>
    </>
  );
};

const condition = (authUser) => !!authUser;

const ComposedPhoto = compose(withRouter)(PhotoPage);

export default withAuthorization(condition)(ComposedPhoto);
