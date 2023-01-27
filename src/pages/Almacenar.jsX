import React, { Component } from "react";
import Web3 from "web3";
import { Buffer } from "buffer";
window.Buffer = Buffer;
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Container, FormGroup, TextField, Typography } from "@mui/material";
import Almacenar from "/build/contracts/Almacenar.json";

const projectid = "2HE6500liSrLAhibQqMO1xM0bkq";
const projectsecret = "1ec2056ba2d6fd362d71a52f4e5c6ed0";
const auth = "Basic " + Buffer.from(projectid + ":" + projectsecret).toString("base64");
const ipfs = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

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
    const coneccion_data = Almacenar.networks[coneccion_id];
    if (coneccion_data) {
      const abi = Almacenar.abi;
      const direccion = coneccion_data.address;
      const contract = new web3.eth.Contract(abi, direccion);
      this.setState({ contract });
      console.log(contract);
      console.log("Hash recuperado de blockchain");
      const sol = contract.methods.obtener().call().then(console.log);
      // console.log(sol)
      // const hHash = await contract.methods.obtener().call()
      //this.setState({hHash})
    } else {
      window.alert("Contrato Inteligente no desplegado en esta red");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      hHash: "",
      cuenta: "",
      contract: null,
    };
  }

  captureFile = (event) => {
    event.preventDefault();
    //proceso de carga de archivo a ipfs
    console.log("archivo cargado");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };

  onSubmit = async (event) => {
    event.preventDefault();
    console.log("Mandando archivo ...");
    if (this.state.buffer) {
      const result = await ipfs.add(this.state.buffer);
      const hHash = result.path;
      console.log("Hash del archivo en la ipfs:", hHash);
      this.state.contract.methods
        .set(hHash)
        .send({ from: this.state.cuenta })
        .then((r) => {
          this.setState({ hHash });
        });
    }
  };

  render() {
    return (
      <Container maxWidth="md">
        <Typography
          variant="h6"
          component="a"
          href="/main"
          textAlign="center"
          sx={{
            mt: 20,
            mb: 3,
            display: { md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Almacenar expediente clinico
        </Typography>

        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <input type="Submit" />
        </form>

        <Typography
          component="p"
          href="/main"
          sx={{
            mt: 2,
            mr: 2,
            display: { md: "flex" },
            fontFamily: "monospace",
          }}
        >
          hash expediente: {this.state.hHash}
        </Typography>
        <Typography
          component="p"
          href="/main"
          sx={{
            mt: 2,
            mr: 2,
            fontFamily: "monospace",
          }}
        >
          hash usuario: {this.state.cuenta}
        </Typography>
      </Container>
    );
  }
}

export default App;
