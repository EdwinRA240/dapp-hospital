import React, {Component} from 'react';
import Web3 from 'web3'
import {Buffer} from "buffer";
window.Buffer = Buffer; 
import swal from "sweetalert";
import { create as ipfsHttpClient } from "ipfs-http-client";
import {
  Button,
  Container,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Contrato from '/build/contracts/Contrato.json';
import Footer from '../components/Footer';

const projectid='2HE6500liSrLAhibQqMO1xM0bkq'
const projectsecret='1ec2056ba2d6fd362d71a52f4e5c6ed0'
const auth=
'Basic ' + Buffer.from(projectid + ':' + projectsecret).toString('base64');
const ipfs = ipfsHttpClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https',
    headers: {
        authorization: auth,
    }, })



class App extends Component {

    async componentWillMount(){
        await this.loadWeb3()
        await this.loadBloackchainData()
    }

    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.request({method: 'eth_requestAccounts'})
        }if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        }else{
            window.alert('Inicia sesion en Metamask')
        }
    }

    async loadBloackchainData(){
        const web3=window.web3
        const cuenta=await web3.eth.getAccounts()
        this.setState({cuenta: cuenta[0]})
        console.log(cuenta)
        const coneccion_id=await web3.eth.net.getId()
        console.log(coneccion_id)
        const coneccion_data=Contrato.networks[coneccion_id]
        if(coneccion_data){
            const abi = Contrato.abi
            const direccion = coneccion_data.address
            const contract = new web3.eth.Contract(abi,direccion)
            this.setState({contract})
            console.log(contract)
            console.log('Hash recuperado de blockchain')
            const sol= await contract.methods.getRecords('0x4de142Df30828aeCda612C026bacc6CA7C50554B').call()
            console.log(sol[0])
            console.log(sol[0][0])
            console.log(sol[0][1])
            console.log(sol[0][2])
            console.log(sol[0][3])
            console.log(sol[0][4])
            console.log(sol[0][5])
            console.log(sol[0][6])
            console.log(sol[0][7])
        }else{
            swal(
                "Atención",
                "Contrato inteligente no desplegado en la red",
                "warning"
            );
        }
    }

    constructor(props) {
    super(props);
    this.state = {
        
        buffer: null,
        hHash:'',
        cuenta:'',
        contract:null,
        nombre:'',
        edad:'',
        diag:'',
        trat:'',
        dir:'',
        date:'',
        state:'',
        note:'',
        sol:[null],
    };
    }


    captureFile = (event) => {
    event.preventDefault()
    //proceso de carga de archivo a ipfs
    console.log("archivo cargado")
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
        console.log(event.target.files[0])
        this.setState({buffer: Buffer(reader.result)})
        }
    }

    handleChange = async (event) => {
        event.preventDefault()
        this.setState({dir: document.getElementById("dir").value})
        this.setState({nombre: document.getElementById("nombre").value})
        this.setState({edad: document.getElementById("edad").value})
        this.setState({diag: document.getElementById("diag").value})
        this.setState({trat: document.getElementById("trat").value})
        this.setState({date: document.getElementById("date").value})
        this.setState({state: document.getElementById("state").value})
        this.setState({note: document.getElementById("note").value})

        

    }

    onSubmit = async (event) => {
        event.preventDefault()
        console.log("Mandando archivo ...")
        if(!this.state.buffer){
            const hHash='Sin archivo adjunto'
            try {
            await this.state.contract.methods.addRecord(this.state.dir,this.state.cuenta,this.state.nombre,this.state.edad,
                this.state.diag,this.state.trat,this.state.date,hHash,this.state.state,this.state.note).send({from:this.state.cuenta}).then((r)=>{
                    this.setState({hHash})
                    this.setState({dir})
                    //window.alert('Expediente almacenado con exito  ')
                    swal(
                            "Almacenamiento Exitoso",
                            "El expediente clínico se a almacenado correctamente",
                            "success"
                        ).then(() => {
                                window.location.assign("MainMed")
                            });
            })}catch (error) {
                       //window.alert("Error al Almacenar el ECE, por el siguiente error: " + error.message);
                        swal(
                                "Error",
                                "Error al Almacenar el ECE, por el siguiente error: " + error.message,
                                "error"
                        ); 
                      };
        }
        if(this.state.buffer){
            const result = await ipfs.add(this.state.buffer);
            const hHash = result.path
            console.log("Hash del archivo en la ipfs:",hHash)
            try {
            await this.state.contract.methods.addRecord(this.state.dir,this.state.cuenta,this.state.nombre,this.state.edad,
                this.state.diag,this.state.trat,this.state.date,hHash,this.state.state,this.state.note).send({from:this.state.cuenta}).then((r)=>{
                    this.setState({hHash})
                    this.setState({dir})
                    //window.alert('Expediente almacenado con exito  ')
                    swal(
                            "Almacenamiento Exitoso",
                            "El expediente clínico se a almacenado correctamente",
                            "success"
                        ).then(() => {
                                window.location.assign("MainMed")
                            });
            })}catch (error) {
                      swal(
                                "Error",
                                "Error al Almacenar el ECE, por el siguiente error: " + error.message,
                                "error"
                        );
                      };
        }
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
     
        <Typography>Almacenar expediente clínico </Typography>

        <FormGroup >
        <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Llave pública del paciente"
            id="dir"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Nombre Completo del paciente"
            id="nombre"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Edad del paciente"
            id="edad"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Diagnóstico del paciente"
            id="diag"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Tratamiento del paciente"
            id="trat"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Estado"
            id="state"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Fecha"
            id="date"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Notas adicionales"
            id="note"
            onChange={this.handleChange}
          />
          <Typography textAlign= 'center' sx={{ mt: 2 }}>Adjunte archivo:</Typography> <input   type='file' onChange = {this.captureFile}/>
          
        </FormGroup>

        <Stack sx={{ mt: 2, justifyContent: "end"  }} direction="row" spacing={2}>
          <Button onClick = {this.onSubmit} variant="contained">Guardar</Button>
          <Button href="mainMed">Cancel</Button>
        </Stack>
      
    </Container>
    <Footer/>
      </>
    );
  }
}

export default App;