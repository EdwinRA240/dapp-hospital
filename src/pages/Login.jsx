import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import {
  Button,
  Container,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";


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
      textAlign= 'center'
        variant="h6"
        component="a"
        //href="/Signin"
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
        ¡¡¡Bienvenido!!!
        &nbsp;
        <br />
        Inicia sesion en Meteamask
        <div>
          <Button variant="contained" onClick={conectar}>
            {buttonText}
            {cuenta}
          </Button>
        </div>
          </Typography>
      
    </Container>
  );
};

export default Login;
