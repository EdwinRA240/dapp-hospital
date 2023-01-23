import { Container, Typography } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";
import { useState } from "react";


const MainPat = () => {

  const [cuenta, setCuenta] = useState(null);
  if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
        setCuenta(result[0]);;
        })
      }

  return (
    <>
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
          Bienvenido !!!
          <br/>
          {cuenta}
        </Typography>
      </Container>
    </>
  );
};

export default MainPat;
