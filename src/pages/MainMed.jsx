import { Box, CardMedia, CircularProgress, Container, Stack, Typography } from "@mui/material";
import React, { Component } from "react";
import Contrato from "/build/contracts/Contrato.json";
import Web3 from "web3";
import medico from "./../assets/medico.png";
import Footer from "../components/Footer";
import NavBarMed from "../components/NavBarMed";
import NavBar from "../components/NavBar";
import NoAuth from "../components/NoAuth";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBloackchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Inicia sesion en Metamask");
    }
  }

  async loadBloackchainData() {
    const web3 = window.web3;
    const cuenta = await web3.eth.getAccounts();
    this.setState({ cuenta: cuenta[0] });
    console.log(cuenta);
    const coneccion_id = await web3.eth.net.getId();
    console.log(coneccion_id);
    const coneccion_data = Contrato.networks[coneccion_id];
    const abi = Contrato.abi;
    const direccion = coneccion_data.address;
    const contract = new web3.eth.Contract(abi, direccion);
    this.setState({ contract });
    console.log(contract);
    const solo = await contract.methods.getMedInfo(cuenta[0]).call();
    console.log(solo[0]);
    this.setState({ solo });
    console.log(solo);
  }

  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellidos: "",
      telefono: "",
      correo: "",
      address: "",
      pass: "",
      id: "",
      cuenta: "",
      solo: "",
      contract: null,
      loading: true,
    };
  }

  render() {
    const loading = this.state;

    if (this.state.solo[0] == undefined || this.state.solo[0] == null || this.state.solo[0] == "") {
      return (
        <>
          <NavBar />
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <NoAuth />
          )}
        </>
      );
    }

    return (
      <>
        <NavBarMed />
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 20,
            pb: 15,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" color="text.primary" gutterBottom>
              Bienvenido {this.state.solo[0]}
              {/* {this.state.solo[1]} */}
            </Typography>
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Llave pública: {this.state.cuenta}
            </Typography> */}
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              ID de empleado: {this.state.solo[6]}
            </Typography>
            <CardMedia
              component="img"
              image={medico}
              sx={{
                maxWidth: "20%",
                margin: "auto",
                p: 2,
              }}
            />
          </Container>
        </Box>
        <Footer />
      </>
    );
  }
}

export default App;
