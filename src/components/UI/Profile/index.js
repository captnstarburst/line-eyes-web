import React from "react";
import Skeleton from "./Skeleton";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../Firebase";
import { compose } from "recompose";

const ProfileIndex = ({ edit, userData }) => {
  if (!userData) return <Skeleton />;

  return <Profile edit={edit} userData={userData} />;
};

const ComposedProfile = compose(withRouter, withFirebase)(ProfileIndex);

export default withRouter(ComposedProfile);
