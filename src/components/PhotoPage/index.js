import React from "react";
import AppBar from "../UI/AppBar";
// import Editor from "./Editor";
import Review from "./Review";
import { Switch, Route, withRouter } from "react-router-dom";
import { withAuthorization } from "../Session";
import { compose } from "recompose";

const PhotoPage = (props) => {
  return (
    <>
      <AppBar />
      <Switch>
        <Route path={`/upload-photo`} exact component={Review} />
      </Switch>
    </>
  );
};

const condition = (authUser) => !!authUser;

const ComposedPhoto = compose(withRouter)(PhotoPage);

export default withAuthorization(condition)(ComposedPhoto);
