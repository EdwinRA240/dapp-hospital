import * as React from "react";
import { Component } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Web3 from "web3";
import Contrato from "/build/contracts/Contrato.json";
import swal from "sweetalert";
import { CardMedia } from "@mui/material";    
import medico from "./../assets/medico.png";
import patient from "./../assets/patient.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
      swal("Atencion", "Inicia sesion en Metamask", "warning");
    }
  }

  async loadBloackchainData() {
    const web3 = window.web3;
    const cuenta = await web3.eth.getAccounts();
    this.setState({ cuenta: cuenta[0] });
    console.log("Cuenta actual: " + cuenta);

    const coneccion_id = await web3.eth.net.getId();
    console.log("Conexion: " + coneccion_id);

    const coneccion_data = Contrato.networks[coneccion_id];
    console.log("ConexionData: " + typeof coneccion_data);
    console.log(coneccion_data == true);

    if (coneccion_data) {
      const abi = Contrato.abi;
      const direccion = coneccion_data.address;
      const contract = new web3.eth.Contract(abi, direccion);
      this.setState({ contract });
      console.log("ContraroIf: "+typeof(contract));
      const passM = await contract.methods.getMedInfo(cuenta[0]).call();
      const passP = await contract.methods.getPatientInfo(cuenta[0]).call();
      this.setState({passM});
      this.setState({passP});
      await contract.methods
        .getPatientInfo(cuenta[0])
        .call(console.log);
      console.log("SOl-Cuenta: " + sol);
    } else {
      swal(
        "Atencion",
        "Contrato Inteligente no desplegado en la red",
        "warning"
      );
    }
  }

  handleChangeM = async (event) => {
        event.preventDefault()
        this.setState({ address: document.getElementById("addressM").value });
        this.setState({ pass: document.getElementById("passM").value });

    }

  handleSubmitM = async (event) => {

    if (this.state.passM[5] == this.state.pass & this.state.passM[3] == this.state.address){
    const data2 = await this.state.contract.methods
      .medExists(this.state.cuenta)
      .call();
    const data = await this.state.contract.methods
      .loginMed(this.state.cuenta, this.state.pass)
      .call();
    if (data2 == true) {
      if (data == true) {
        swal(
          "Inicio de sesion correcto",
          "Presiona el boton para continuar",
          "success"
        ).then(() => {
          window.location.assign("MainMed");
        });
      }
    }
    } else {
      swal("Contraseña incorrecta", "Vuelva a intentar", "error");
    }
  };

  handleSubmitP = async (event) => {

    if (this.state.passP[5] == this.state.pass & this.state.passP[3] == this.state.address ){
    const data2 = await this.state.contract.methods
      .patientExists(this.state.cuenta)
      .call();
    const data = await this.state.contract.methods
      .loginPatient(this.state.cuenta, this.state.pass)
      .call();

    if (data2 == true) {
      if (data == true) {
        swal(
          "Inicio de sesion correcto",
          "Presiona el boton para continuar",
          "success"
        ).then(() => {
          window.location.assign("MainMed");
        });
      }
    }
    } else {
      swal("Contraseña incorrecta", "Vuelva a intentar", "error");
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
      data: false,
      data2: false,
      passM: [],
      passP:[],
      contract: null,
      validateP: true,
      validateM: false,
    };
  }

  handleValidateP = () => {
    // console.log(this.state.validateP);
    if (this.state.validateP == true){
      this.setState({
        validateP: false,
        validateM: true
      })
    }else{
      this.setState({
        validateP: true,
        validateM: false
      })
    }
  };

  handleValidateM = () => {
    // console.log(this.state.validateM);
    if (this.state.validateM == true){
      this.setState({
        validateM: false,
        validateP: true
      })
    }else{
      this.setState({
        validateM: true,
        validateP: false
      })
    }
  };

  render() {
    return (
      <Container
        fixed
        sx={{
          flexGrow: 1,
          mt: 15,
          display: "flex",
          whiteSpace: "normal",
        }}
      >
        <Grid container spacing={2}>
          {this.state.validateP && (
            <Grid item xs={12} sm={6}>
              <Item>
                {" "}
                <Container
                  component="main"
                  maxWidth="xs"
                  sx={{ mt: 1, mb: 5 }}
                >
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 5,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Inicio de sesion de Pacientes
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                      <TextField
                        required
                        margin="normal"
                        fullWidth
                        name="useer"
                        id="addressP"
                        label="Public Address Patient "
                        autoComplete="Public Address Patient "
                        autoFocus
                      />
                      <TextField
                        required
                        margin="normal"
                        fullWidth
                        name="password"
                        id="passP"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                      />

                      <Button
                        fullWidth
                        variant="contained"
                        onClick={this.handleSubmitP}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Iniciar Sesion
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="PassPat" variant="body2">
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="/registroPat" variant="body2">
                            {"¿No tienes cuenta? Inscribete aqui"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </Item>
            </Grid>
          )}

          {(!this.state.validateP) && (
            <Grid item xs={12} sm={6}>
              <Item>
                <Container
                  component="main"
                  maxWidth="xs"
                  sx={{ mt: 1, mb: 5 }}
                >
                  <CardMedia
                    component="img"
                    image={patient}
                    sx={{
                      maxWidth: "100%",
                      margin: "auto",
                      p: 2,
                    }}
                  />

                  <Button
                    onClick={this.handleValidateP}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Soy un paciente
                  </Button>
                </Container>
              </Item>
            </Grid>
          )}
          {this.state.validateM && (<Grid item xs={12} sm={6}>
            <Item>
              {" "}
              <Container
                component="Main"
                maxWidth="xs"
                sx={{ mt: 1, mb: 5 }}
              >
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Inicio de sesion de Medicos
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      required
                      margin="normal"
                      fullWidth
                      name="useer"
                      id="addressM"
                      onChange={this.handleChangeM}
                      label="Public Address Doctor"
                      autoComplete="Public Address Doctor"
                      autoFocus
                    />
                    <TextField
                      required
                      margin="normal"
                      fullWidth
                      name="password"
                      id="passM"
                      onChange={this.handleChangeM}
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                    />
                    <Button
                      onClick={this.handleSubmitM}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Iniciar Sesion
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="PassMed" variant="body2">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/registroMed" variant="body2">
                          {"¿No tienes cuenta? Inscribete aqui"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Item>
          </Grid>)}
          {(!this.state.validateM) && (
            <Grid item xs={12} sm={6}>
              <Item>
                {" "}
                <Container
                  component="main"
                  maxWidth="xs"
                  sx={{ mt: 1, mb: 5 }}
                >
                  <CardMedia
                    component="img"
                    image={medico}
                    sx={{
                      maxWidth: "100%",
                      margin: "auto",
                      p: 2,
                    }}
                  />

                  <Button
                    onClick={this.handleValidateM}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Soy un medico
                  </Button>
                </Container>
              </Item>
            </Grid>
          )}
        </Grid>
      </Container>
    );
  }
}
export default App;
