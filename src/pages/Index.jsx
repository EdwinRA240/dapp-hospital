import { React, useState } from "react";
import Footer from "../components/Footer";
import expediente from "./../assets/expediente.svg";
import {
  Box,
  Button,
  CardMedia,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MetamaskImage from "./../assets/metamask.svg";

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
          location.href = "/SignIn";
        })
        .catch((error) => {
          setButtonText(error.message);
          swal("Error", error.message, "warning");
          alert(error.message);
        });
    } else {
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
          <Typography variant="h3" align="center" color="text.primary" gutterBottom>
            ¡Hola!
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Bienvenido al sistema de Expedientes Clínicos Electrónicos (ECE). Para acceder
            a el sistema, por favor incia sesion con una cuenta de MetaMask.
          </Typography>
          <CardMedia
            component="img"
            image={expediente}
            sx={{
              maxWidth: "50%",
              margin: "auto",
              p: 2,
            }}
          />
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={conectar}>
              Iniciar sesión
            </Button>
            <Button variant="outlined" href="https://metamask.io/" target="_blank">
              Conocer más
              <IconButton>
                <img src={MetamaskImage} alt="icono" style={{width: "20px", padding: "0px"}} />
              </IconButton>
            </Button>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Login;
