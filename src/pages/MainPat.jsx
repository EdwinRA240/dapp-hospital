import { Box, CardMedia, Container, Typography } from "@mui/material";
import React, { Component } from "react";
import NavBar from "../components/NavBarMed";
import { useState } from "react";
import Contrato from "/build/contracts/Contrato.json";
import Web3 from "web3";
import patient from "./../assets/patient.png";
import Footer from "./../components/Footer";

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
    const solo = await contract.methods.getPatientInfo(cuenta[0]).call();
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
      cuenta: "",
      solo: "",
      contract: null,
    };
  }

  render() {
    return (
      <>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 15,
            pb: 10,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" color="text.primary" gutterBottom>
              Bienvenido {this.state.solo[0]}
              {/* {this.state.solo[1]} */}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Llave pública: {this.state.cuenta}
            </Typography>
            <CardMedia
              component="img"
              image={patient}
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
