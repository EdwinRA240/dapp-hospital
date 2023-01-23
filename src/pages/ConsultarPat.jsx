import { Container, Typography } from "@mui/material";
import React from "react";

const ConsultarPat = () => {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h6"
        component="a"
        href="/main"
        sx={{
          mt: 20,
          mr: 2,
          display: { md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Consulta
      </Typography>
    </Container>
  );
};

export default ConsultarPat;