import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Footer = (props) => {
  return (
    <footer
      style={{ marginTop: "150px", color: props.white ? "#fff" : "primary" }}
    >
      <Typography
        style={{ textAlign: "center", fontSize: "16px" }}
        variant="h2"
        color={"inherit"}
      >
        Line-Eyes &copy;
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Link href="/privacy-policy" color={"inherit"}>
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" color={"inherit"}>
            Terms & Conditions
          </Link>
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
