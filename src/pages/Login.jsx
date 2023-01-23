import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const Login = () => {
  const [buttonText, setButtonText] = useState("Conexion a Metamask");
  const [cuenta, setCuenta] = useState(null);
  const conectar = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setCuenta(result[0]);
          setButtonText(null);
          location.href = "/Signin";
        })
        .catch((error) => {
          setButtonText(error.message);
        });
    } else {
      setButtonText("Necesitas tener Metamask instalado");
    }
  };

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
        <hr1> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bienvenido</hr1>
        &nbsp;
        <br />
        <hr2>Inicia sesion en Meteamask</hr2>
        <div>
          <button onClick={conectar}>
            {buttonText}
            {cuenta}
          </button>
        </div>

      </Typography>
    </Container>
  );
};

export default Login;
