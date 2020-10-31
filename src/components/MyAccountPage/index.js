import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "../UI/AppBar";
import Footer from "../UI/Footer";
import Profile from "../UI/Profile";
import CenteredTabs from "./Navigation";
import { Stats } from "./Stats";
import { Uploads } from "./Uploads";
import { Activity } from "./Activity";
import { Settings } from "./Settings";
import { withAuthorization } from "../Session";
import { Switch, Route } from "react-router-dom";

const MyAccountPage = (props) => {
  return (
    <>
      <AppBar />
      <CssBaseline />
      <Container fixed>
        <Profile edit />
        <CenteredTabs />
        <Typography component="section" style={{ backgroundColor: "#cfe8fc" }}>
          <Switch>
            <Route path={`/Me/stats`} exact component={Stats} />
            <Route path={`/Me/uploads`} exact component={Uploads} />
            <Route path={`/Me/activity`} component={Activity} />
            <Route path={`/Me/settings`} component={Settings} />
          </Switch>
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(MyAccountPage);
