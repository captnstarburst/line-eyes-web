import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "../UI/AppBar";
import Footer from "../UI/Footer";
import Profile from "../UI/Profile";
import CenteredTabs from "./Navigation";
import Stats from "./Stats";
import Uploads from "./Uploads";
import Activity from "./Activity";
import Settings from "./Settings";
import useUserDataListener from "../Hooks/useUserDataListener";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";

const MyAccountPage = (props) => {
  const userData = useUserDataListener(props.firebase);

  return (
    <>
      <AppBar />
      <CssBaseline />
      <Container fixed>
        <Profile edit userData={userData} />
        <CenteredTabs />
        <Typography component="article" style={{ backgroundColor: "#cfe8fc" }}>
          <Switch>
            <Route path={`/Me/stats`} exact component={Stats} />
            <Route path={`/Me/uploads`}>
              {userData && <Uploads userData={userData} />}
            </Route>
            <Route path={`/Me/activity`} component={Activity} />
            <Route path={`/Me/settings`}>
              {userData && <Settings userData={userData} />}
            </Route>
          </Switch>
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

const condition = (authUser) => !!authUser;

const ComposedMyAccount = compose(withFirebase)(MyAccountPage);

export default withAuthorization(condition)(ComposedMyAccount);
