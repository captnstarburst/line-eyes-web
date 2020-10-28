import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "../UI/AppBar";
import Footer from "../UI/Footer";
import Profile from "../UI/Profile";
import Activity from "./Activity";
import { withAuthorization } from "../Session";

const AdminPage = (props) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function IIFE() {
      const role = await props.firebase.getRole();
      setRole(role);
    }
    IIFE();
  }, [props.firebase]);

  if (!role) return null;

  return (
    <>
      <AppBar />
      <CssBaseline />
      <Container fixed>
        <Profile />
        <Typography component="section" style={{ backgroundColor: "#cfe8fc" }}>
          <Activity />
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AdminPage);
