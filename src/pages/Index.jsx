import { React, useState, useEffect } from "react";
import Footer from "../components/Footer";
import expediente from "./../assets/expediente.svg";
import { Box, Button, CardMedia, Container, IconButton, Stack, Typography } from "@mui/material";
import MetamaskImage from "./../assets/metamask.svg";
import Loading from "./../components/Loading";

const Login = () => {
  const [loading, setLoading] = useState(true);

  const conectar = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          location.href = "/SignIn";
        })
        .catch((error) => {
          swal("Error", error.message, "warning");
          alert(error.message);
        });
    } else {
      swal("Alerta", "Necesitas tener Metamask instalado", "warning");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                Bienvenido al sistema de Expedientes Clínicos Electrónicos (ECE). Para acceder a el
                sistema, por favor incia sesion con una cuenta de MetaMask.
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
                    <img
                      src={MetamaskImage}
                      alt="icono"
                      style={{ width: "20px", padding: "0px" }}
                    />
                  </IconButton>
                </Button>
              </Stack>
            </Container>
          </Box>
          <Footer />
        </>
      )}
    </>
  );
};

export default Login;
