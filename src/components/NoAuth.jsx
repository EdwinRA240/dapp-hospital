import { Container, Typography } from "@mui/material";
import { React } from "react";

const NoAuth = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Typography
          variant="h6"
          component="a"
          href="/SignIn"
          sx={{
            mt: 15,
            mr: 2,
            display: { md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          ERROR AUTH -{">"} TO SIGNIN
        </Typography>
      </Container>
    </>
  );
};

export default NoAuth;
