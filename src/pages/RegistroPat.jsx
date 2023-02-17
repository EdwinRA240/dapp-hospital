import React, { Component } from "react";
import NavBar from "../components/NavBarMed";
import { useState } from "react";
import Contrato from "/build/contracts/Contrato.json";
import Web3 from "web3";
import Footer from "../components/Footer";
import {
  Button,
  Container,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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
    if (coneccion_data) {
      const abi = Contrato.abi;
      const direccion = coneccion_data.address;
      const contract = new web3.eth.Contract(abi, direccion);
      this.setState({ contract });
      console.log(contract);
      const sol = await contract.methods.getPatientInfo(cuenta[0]).call();
      console.log(sol);
    } else {
      window.alert("Contrato Inteligente no desplegado en esta red");
    }
  }

  handleChange = async (event) => {
    event.preventDefault();
    this.setState({ nombre: document.getElementById("nombre").value });
    this.setState({ apellidos: document.getElementById("apellidos").value });
    this.setState({ telefono: document.getElementById("telefono").value });
    this.setState({ correo: document.getElementById("correo").value });
    this.setState({ address: document.getElementById("address").value });
    this.setState({ pass: document.getElementById("pass").value });

    this.setState({nomValid : /^[a-zA-Z ]+$/.test(this.state.nombre)});
    this.setState({apeValid : /^[a-zA-Z ]+$/.test(this.state.apellidos)});
    this.setState({telValid : /^[0-9]+$/.test(this.state.telefono)});
    this.setState({corValid : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.state.correo)});
    this.setState({pasValid : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-_])[A-Za-z\d@_-]{6,}$/.test(this.state.pass)});
    
  };

  enviar = async (event) => {
    event.preventDefault();

    if (!this.state.nomValid) {
      //alert("El nombre debe contener solo letras");
      this.setState({span:"El nombre lleva solo letras"});

    } else {
        this.setState({span:""});
    }

    if (!this.state.apeValid) {
      //alert("El nombre debe contener solo letras");
      this.setState({span2:"El apellido lleva solo letras"});

    } else {
        this.setState({span2:""});
    }

    if (!this.state.telValid) {
      //alert("El nombre debe contener solo letras");
      this.setState({span3:"El telefono lleva solo letras"});

    } else {
        this.setState({span3:""});
    }

    if (!this.state.corValid) {
      //alert("El nombre debe contener solo letras");
      this.setState({span4:"No cumple con el formato de un correo electronico"});

    } else {
        this.setState({span4:""});
    }

    if (!this.state.pasValid) {
      //alert("El nombre debe contener solo letras");
      this.setState({span5:"Debe llevar al menos 1 mayusacula, un signo especial (- _) y almenos 6 caracteres "});

    } else {
        this.setState({span5:""});
    }

    

    if (!this.state.nombre || !this.state.apellidos || !this.state.telefono || !this.state.address ||
         !this.state.correo || !this.state.pass) {
        alert("Todos los campos son obligatorios");
    }else{
      if (this.state.nomValid && this.state.apeValid && this.state.telValid && this.state.corValid &&
         this.state.pasValid) {

        if (this.state.cuenta == this.state.address) {
          try {
          await this.state.contract.methods
            .addPatient(
              this.state.nombre,
              this.state.apellidos,
              this.state.telefono,
              this.state.address,
              this.state.correo,
              this.state.pass
            )
            .send({ from: this.state.cuenta })
            .then((r) => {
              window.alert("Registro existoso");
              window.location.assign("signin");
            })}catch (error) {
                           window.alert("Error al crear el usuario, por el siguiente error: " + error.message);
                          };;
        } else {
          alert(
            "La public address ingresada no coincide con la de la cuenta activa de metamask"
          );
        }
      } else {
        alert('Llene correctamente los campos')
      }
    }
  };

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
      sol: [],
      contract: null,
      nomValid: null,
      apeValid: null,
      telValid: null,
      corValid: null,
      pasValid: null,
      span:null,
      span2:null,
      span3:null,
      span4:null,
      span5:null,

    };
  }

  render() {
    return (
      <>
        <Container
          maxWidth="sm"
          sx={{
            mt: 15,
          }}
        >
          <Typography>Registro de Pacientes</Typography>

          <FormGroup>
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Nombre"
              id="nombre"
              onChange={this.handleChange}
            />
            <Typography color="red"> {<span>{this.state.span}</span>} </Typography>

            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Apellidos"
              id="apellidos"
              onChange={this.handleChange}
            />
            <Typography color="red"> {<span>{this.state.span2}</span>} </Typography>

            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Numero de Telefono"
              id="telefono"
              onChange={this.handleChange}
            />
            <Typography color="red"> {<span>{this.state.span3}</span>} </Typography>
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Correo Electronico"
              id="correo"
              onChange={this.handleChange}
            />
            <Typography color="red"> {<span>{this.state.span4}</span>} </Typography>
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Public Adress"
              id="address"
              onChange={this.handleChange}
            />
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Contraseña"
              id="pass"
              type="password"
              onChange={this.handleChange}
            />
            <Typography color="red"> {<span>{this.state.span5}</span>} </Typography>
          </FormGroup>

          <Stack sx={{ mt: 2, justifyContent: "end" }} direction="row" spacing={2}>
            <Button onClick={this.enviar} variant="contained">
              Crear
            </Button>
            <Button>Reset</Button>
            <Button href="signin">Regresar</Button>
          </Stack>
        </Container>

        <Footer />
      </>
    );
  }
}

export default App;
