import { Container, Typography } from "@mui/material";
import { React } from "react";

const NotFound = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Typography
          variant="h6"
          component="a"
          href="/Main"
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
          ERROR 404 -{">"} PAGE NOT FOUND
        </Typography>
      </Container>
    </>
  );
};

export default NotFound;
