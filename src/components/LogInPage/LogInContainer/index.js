import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PregnancyTest from "../../assets/pregnancy-test.png";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProviderSignUp from "./ProviderSignUp";
import LogInForm from "./LogInForm";
import CreateForm from "./CreateForm";
import Error from "./Error";
import ForgotForm from "./ForgotForm";

const LogInContainer = (props) => {
  const [currentFormMounted, setCurrentForm] = useState("provider");

  const handleLogInClick = () => {
    setCurrentForm("login");
  };

  const handleBackClick = () => {
    setCurrentForm("provider");
  };

  const handleCreateClick = () => {
    setCurrentForm("create");
  };

  const handleForgotClick = () => {
    setCurrentForm("forgot");
  };

  const mountError = () => {
    setCurrentForm("error");
  };

  return (
    <section>
      {currentFormMounted === "provider" ? (
        <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
          <Button
            color="primary"
            onClick={handleLogInClick}
            endIcon={<ArrowRightAltIcon />}
          >
            Log In{" "}
          </Button>
        </div>
      ) : (
        <Button
          color="primary"
          onClick={handleBackClick}
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
      )}

      <Typography
        align="center"
        color="primary"
        variant="h3"
        component="h1"
        style={{ fontFamily: "Red Rose, cursive" }}
      >
        Line - Eyes
      </Typography>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={PregnancyTest}
          alt="Line - Eyes App"
          style={{ width: "50%", marginBottom: "50px" }}
        />

        {currentFormMounted === "provider" && (
          <ProviderSignUp
            propagateCreateClick={handleCreateClick}
            propagateError={mountError}
          />
        )}

        {currentFormMounted === "login" && (
          <LogInForm
            propagateError={mountError}
            propagateForgot={handleForgotClick}
          />
        )}

        {currentFormMounted === "create" && (
          <CreateForm propagateError={mountError} />
        )}

        {currentFormMounted === "forgot" && (
          <ForgotForm propagateError={mountError} />
        )}

        {currentFormMounted === "error" && <Error />}
      </div>
    </section>
  );
};

export default LogInContainer;
