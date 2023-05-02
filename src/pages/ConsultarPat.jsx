import React, { Component } from "react";
import Web3 from "web3";
import MyModal from "/src/components/Modal.jsx";
import swal from "sweetalert";
import { Buffer } from "buffer";
window.Buffer = Buffer;
import { create as ipfsHttpClient } from "ipfs-http-client";
import {
  Button,
  Container,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Contrato from "/build/contracts/Contrato.json";
import Footer from "/src/components/Footer";

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
    } else {
      swal("Atención", "Contrato inteligente no desplegado en la red", "warning");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: false,
      hiddenFrame: false,
      hiddenFrame2: false,
      buffer: null,
      hHash: "",
      cuenta: "",
      contract: null,
      nombre: "",
      edad: "",
      diag: "",
      diag2: "",
      trat: "",
      dir: "",
      date: "",
      link: "",
      ind: "",
      state: "",
      note: "",
      sol: [null],
      sol2: [null],
      registros: [null],
      modalOpen: false,
      modalmessage: "",
      modalmessage2: "",
      modalmessage3: "",
      modalmessage4: "",
      modalmessage5: "",
      modalmessage6: "",
      modalmessage7: "",
      modalmessage8: "",
      modalmessage9: "",
      registrosPorDiagnostico: {},
    };
  }

  handleOpenModal = (
    event,
    message,
    message2,
    message3,
    message4,
    message5,
    message6,
    message7,
    message8,
    message9
  ) => {
    event.preventDefault();
    this.setState({ modalOpen: true });
    this.setState({ modalmessage: message });
    this.setState({ modalmessage2: message2 });
    this.setState({ modalmessage3: message3 });
    this.setState({ modalmessage4: message4 });
    this.setState({ modalmessage5: message5 });
    this.setState({ modalmessage6: message6 });
    this.setState({ modalmessage7: message7 });
    this.setState({ modalmessage8: message8 });
    this.setState({ modalmessage9: message9 });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
    this.setState({ modalmessage: "" });
    this.setState({ modalmessage2: "" });
    this.setState({ modalmessage3: "" });
    this.setState({ modalmessage4: "" });
    this.setState({ modalmessage5: "" });
    this.setState({ modalmessage6: "" });
    this.setState({ modalmessage7: "" });
    this.setState({ modalmessage8: "" });
    this.setState({ modalmessage9: "" });
  };

  handleChange = async (event) => {
    event.preventDefault();
    this.setState({ dir: document.getElementById("dir").value });
  };

  consulta = async (event) => {
    event.preventDefault();

    const registros = await this.state.contract.methods
      .getRecords(this.state.cuenta)
      .call();
    console.log(registros);
    this.setState({ registros });
    if (registros.length == 0) {
      //alert("El paciente no tiene expedientes registrados");
      swal("Error", "No tienes expedientes registrados", "error");
      return;
      return;
    }
    console.log(registros[0][1]);

    // Agrupar los registros por diagnóstico
    //registrosPorDiagnostico = {};
    registros.forEach((registro) => {
      const diagnostico = registro[4];
      if (!this.state.registrosPorDiagnostico[diagnostico]) {
        this.state.registrosPorDiagnostico[diagnostico] = [];
      }
      this.state.registrosPorDiagnostico[diagnostico].push(registro);
    });

    console.log(this.state.registrosPorDiagnostico);
    //this.setState({ registrosPorDiagnostico });
    this.setState({ buttonPressed: true });
  };

  elegir = async (event, param, param2) => {
    event.preventDefault();
    console.log(this.state.ind);
    const sol = await this.state.contract.methods.getRecords(this.state.dir).call();
    console.log(sol);
    console.log(this.state.diag2);
    console.log(this.state.registrosPorDiagnostico);
    console.log(sol[this.state.ind][1]);
    this.setState({ sol });
    const diagArray = this.state.registrosPorDiagnostico;
    const diagnosis = this.state.diag2;

    console.log(diagArray);
    console.log(diagnosis);

    if (diagnosis == "Cancer") {
      const patientTurn = diagArray.Cancer[this.state.ind];
      console.log(patientTurn);
      this.setState({ med: patientTurn[1] });
      this.setState({ nombre: patientTurn[2] });
      this.setState({ edad: patientTurn[3] });
      this.setState({ diag: patientTurn[4] });
      this.setState({ trat: patientTurn[5] });
      this.setState({ date: patientTurn[6] });
      this.setState({ state: patientTurn[8] });
      this.setState({ note: patientTurn[9] });
      if (patientTurn[7] == "Sin archivo adjunto") {
        const link = "Sin archivo adjunto";
        this.setState({ link });
        this.setState({ hiddenFrame: true });
      } else {
        const link = "https://ipfs.io/ipfs/" + patientTurn[7];
        this.setState({ link });
        console.log(link);
        this.setState({ hiddenFrame: true });
        this.setState({ hiddenFrame2: true });
      }
    } else if (diagnosis == "Diabetes") {
      const patientTurn = diagArray.Diabetes[this.state.ind];
      console.log(patientTurn);
      this.setState({ med: patientTurn[1] });
      this.setState({ nombre: patientTurn[2] });
      this.setState({ edad: patientTurn[3] });
      this.setState({ diag: patientTurn[4] });
      this.setState({ trat: patientTurn[5] });
      this.setState({ date: patientTurn[6] });
      this.setState({ state: patientTurn[8] });
      this.setState({ note: patientTurn[9] });
      if (patientTurn[7] == "Sin archivo adjunto") {
        const link = "Sin archivo adjunto";
        this.setState({ link });
        this.setState({ hiddenFrame: true });
      } else {
        const link = "https://ipfs.io/ipfs/" + patientTurn[7];
        this.setState({ link });
        console.log(link);
        this.setState({ hiddenFrame: true });
        this.setState({ hiddenFrame2: true });
      }
    }
  };

  render() {
    return (
      <>
        <Container
          maxWidth="sm"
          sx={{
            mt: 12,
          }}
        >
          <Typography variant="h5" align="center" color="text.primary" gutterBottom>
            Consulta
          </Typography>

          <Stack sx={{ mt: 2, justifyContent: "end" }} direction="row" spacing={2}>
            <Button variant="contained" onClick={this.consulta}>
              Consulta
            </Button>
          </Stack>

          {this.state.buttonPressed && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Typography variant="h5">
                Expedientes del paciente {this.state.registros[0][2]}
              </Typography>
              {Object.keys(this.state.registrosPorDiagnostico).map((diagnostico) => (
                <div key={diagnostico}>
                  <Typography variant="h5">Expedientes de {diagnostico} </Typography>
                  <Typography variant="body1">
                    <br /> Cantidad de expedientes:{" "}
                    {this.state.registrosPorDiagnostico[diagnostico].length}
                  </Typography>
                  {this.state.registrosPorDiagnostico[diagnostico].map((item, j) => (
                    <Typography>
                      <lo key={j}>
                        <br />
                        Expediente {j + 1} <br />
                        Tratamiento del paciente: {item.treatment}
                        <br />
                        Fecha en que se realizó: {item.date}
                        <br />
                        Estado: {item.state}
                        <Stack
                          sx={{ mt: 2, justifyContent: "end" }}
                          direction="row"
                          spacing={2}
                        >
                          <Button
                            variant="contained"
                            key={j}
                            onClick={(event) => {
                              this.elegir(
                                event,
                                this.setState({ ind: j }),
                                this.setState({
                                  diag2: diagnostico,
                                })
                              );
                              this.handleOpenModal(
                                event,
                                item.adressM,
                                item.patientName,
                                item.age,
                                item.diagnosis,
                                item.treatment,
                                item.date,
                                item.state,
                                item.note,
                                item.fileHash
                              );
                            }}
                          >
                            Ver ECE completo
                          </Button>
                        </Stack>
                        <MyModal
                          open={this.state.modalOpen}
                          onClose={this.handleCloseModal}
                          message={this.state.modalmessage}
                          message2={this.state.modalmessage2}
                          message3={this.state.modalmessage3}
                          message4={this.state.modalmessage4}
                          message5={this.state.modalmessage5}
                          message6={this.state.modalmessage6}
                          message7={this.state.modalmessage7}
                          message8={this.state.modalmessage8}
                          message9={this.state.modalmessage9}
                        />
                        <br />
                      </lo>
                    </Typography>
                  ))}
                </div>
              ))}
            </Stack>
          )}

          <br />
        </Container>
        {/* <Footer /> */}
      </>
    );
  }
}

export default App;
