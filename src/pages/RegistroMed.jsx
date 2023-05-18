import React, { Component } from "react";
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
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
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
      const sol = await contract.methods.getMedInfo(cuenta[0]).call();
      console.log(sol);
    } else {
      swal(
        "Atención",
        "Contrato inteligente no desplegado en la red",
        "warning"
      );
    }
  }

  handleChange = async (event) => {
    event.preventDefault();
    this.setState({
      nombre: document.getElementById("nombre").value,
    });
    this.setState({
      apellidos: document.getElementById("apellidos").value,
    });
    this.setState({
      telefono: document.getElementById("telefono").value,
    });
    this.setState({
      correo: document.getElementById("correo").value,
    });
    this.setState({
      address: document.getElementById("address").value,
    });
    this.setState({ pass: document.getElementById("pass").value });
    this.setState({ id: document.getElementById("id").value });
    this.setState({ esp: document.getElementById("esp").value });

    this.setState({
      nomValid: /^[a-zA-ZáéííÁÉ ]+$/.test(this.state.nombre),
    });
    this.setState({
      apeValid: /^[a-zA-ZáéííÁÉ ]+$/.test(this.state.apellidos),
    });
    this.setState({ telValid: /^[0-9]+$/.test(this.state.telefono) });
    this.setState({
      corValid:
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          this.state.correo
        ),
    });
    this.setState({
      pasValid:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#$%^&+=_!.-]{6,}$/.test(
          this.state.pass
        ),
    });
    this.setState({
      espValid: /^[a-zA-ZáéííÁÉ ]+$/.test(this.state.esp),
    });
  };

  enviar = async (event) => {
    event.preventDefault();

    if (!this.state.nomValid) {
      this.setState({ span: "El nombre lleva sólo letras" });
    } else {
      this.setState({ span: "" });
    }

    if (!this.state.apeValid) {
      this.setState({ span2: "El apellido lleva sólo letras" });
    } else {
      this.setState({ span2: "" });
    }

    if (!this.state.telValid) {
      this.setState({ span3: "El telefono lleva sólo números" });
    } else {
      this.setState({ span3: "" });
    }

    if (!this.state.corValid) {
      this.setState({
        span4: "No cumple con el formato de un correo electrónico",
      });
    } else {
      this.setState({ span4: "" });
    }

    if (!this.state.pasValid) {
      this.setState({
        span5:
          "Debe contener al menos 1 mayúscula, 1 minúscula, un signo especial y al menos 6 caracteres",
      });
    } else {
      this.setState({ span5: "" });
    }

    if (!this.state.espValid) {
      this.setState({ span6: "La especialidad lleva sólo  letras" });
    } else {
      this.setState({ span6: "" });
    }
    if (
      !this.state.nombre ||
      !this.state.apellidos ||
      !this.state.telefono ||
      !this.state.address ||
      !this.state.correo ||
      !this.state.pass
    ) {
      // alert("Todos los campos son obligatorios");
      swal("Error", "Todos los campos son obligatorios", "error");
    } else {
      if (
        this.state.nomValid &&
        this.state.apeValid &&
        this.state.telValid &&
        this.state.corValid &&
        this.state.pasValid
      ) {
        if (this.state.cuenta == this.state.address) {
          try {
            await this.state.contract.methods
              .addMed(
                this.state.nombre,
                this.state.apellidos,
                this.state.telefono,
                this.state.address,
                this.state.correo,
                this.state.pass,
                this.state.id,
                this.state.esp
              )
              .send({ from: this.state.cuenta })
              .then((r) => {
                // window.alert("Registro existoso");
                // window.location.assign("signin");
                swal(
                  "Registro exitoso",
                  "Presiona el botón para continuar",
                  "success"
                ).then(() => {
                  window.location.assign("SignIn");
                });
              });
          } catch (error) {
            if (error.message.includes("El id de empleado no existe")) {
                swal(
                      "Error",
                      "El id de empleado no existe",
                      "error"
                    );
              } else {
                if (error.message.includes("La addresd que estas ingresando ya esta registrada, ya existe este medico")) {
                swal(
                      "Error",
                      "La llave pública que estas ingresando ya esta registrada, ya existe este médico",
                      "error"
                    );
                } else {
                if (error.message.includes("Este id ya esta en uso")) {
                swal(
                      "Error",
                      "Este id ya esta en uso",
                      "error"
                    );
                } else {
                  swal(
                      "Error",
                      "Transaccion cancelada",
                      "error"
                    );
                }
              }
          }
        }
        } else {
          swal(
            "Error",
            "La llave pública ingresada no coincide con la de la cuenta activa de metamask",
            "error"
          );
        }
      } else {
        swal("Error", "Llene correctamente los campos", "error");
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
      id: "",
      esp: "",
      sol: [],
      contract: null,
      nomValid: null,
      apeValid: null,
      telValid: null,
      corValid: null,
      pasValid: null,
      espValid: null,
      span: null,
      span2: null,
      span3: null,
      span4: null,
      span5: null,
      span6: null,
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
          <Typography>Registro de Personal Médico</Typography>

          <FormGroup noValidate>
            <TextField
              required
              fullWidth
              sx={{ mt: 2 }}
              label="Nombre"
              id="nombre"
              onChange={this.handleChange}
            />
            <Typography color="red">
              {" "}
              {<span>{this.state.span}</span>}{" "}
            </Typography>
            <TextField
              required
              fullWidth
              sx={{ mt: 2 }}
              label="Apellidos"
              id="apellidos"
              onChange={this.handleChange}
            />
            <Typography color="red">
              {" "}
              {<span>{this.state.span2}</span>}{" "}
            </Typography>
            <TextField
              required
              fullWidth
              sx={{ mt: 2 }}
              label="Numero de Teléfono"
              id="telefono"
              onChange={this.handleChange}
            />
            <Typography color="red">
              {" "}
              {<span>{this.state.span3}</span>}{" "}
            </Typography>
            <TextField
              required
              fullWidth
              sx={{ mt: 2 }}
              label="Correo Electrónico"
              id="correo"
              onChange={this.handleChange}
            />
            <Typography color="red">
              {" "}
              {<span>{this.state.span4}</span>}{" "}
            </Typography>
            <TextField
              required
              fullWidth
              sx={{ mt: 2 }}
              label="ID de empleado"
              id="id"
              onChange={this.handleChange}
            />
            <TextField
              required
              fullWidth
              sx={{ mt: 2 }}
              label="Especialidad"
              id="esp"
              onChange={this.handleChange}
            />
            <Typography color="red">
              {" "}
              {<span>{this.state.span6}</span>}{" "}
            </Typography>
            <TextField
              fullWidth
              required
              sx={{ mt: 2 }}
              label="Llave pública"
              id="address"
              onChange={this.handleChange}
            />
            <TextField
              fullWidth
              required
              sx={{ mt: 2 }}
              label="Contraseña"
              type="password"
              id="pass"
              onChange={this.handleChange}
            />
            <Typography color="red">
              {" "}
              {<span>{this.state.span5}</span>}{" "}
            </Typography>
          </FormGroup>

          <Stack
            sx={{ mt: 2, justifyContent: "end" }}
            direction="row"
            spacing={2}
          >
            <Button onClick={this.enviar} variant="contained">
              Crear
            </Button>
            <Button href="signin">Regresar</Button>
          </Stack>
        </Container>

        <Footer />
      </>
    );
  }
}

export default App;
