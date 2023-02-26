import React from "react";
import Footer from "../components/Footer";
import { useState } from "react";
import metamask from "./../assets/metamask.svg";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";

const Login = () => {
  const [buttonText, setButtonText] = useState("Conexion a Metamask");
  const [cuenta, setCuenta] = useState(null);
  //Al agregar alert se ocupa

  const conectar = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setCuenta(result[0]);
          setButtonText(null);
          location.href = "/SignIn";
        })
        .catch((error) => {
          setButtonText(error.message);
          swal("Error", error.message, "warning");
          alert(error.message);
        });
    } else {
      // resetButtonText("Necesitas tener Metamask instalado");
      swal("Alerta", "Necesitas tener Metamask instalado", "warning");
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 15,
          pb: 10,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Bienvenido
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Necesitas ingresar con una wallet Ethereum en Metamask para poder hacer uso de
            esta DApp.
          </Typography>
          <CardMedia
            component="img"
            image={metamask}
            sx={{
              maxWidth: "30%",
              margin: "auto",
              p: 2
            }}
          />
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={conectar}>
              Iniciar sesión
            </Button>
            <Button variant="outlined" href="https://metamask.io/" target="_blank">
              Conocer más
            </Button>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Login;
