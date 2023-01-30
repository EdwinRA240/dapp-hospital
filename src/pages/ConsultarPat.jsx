import React, {Component} from 'react';
import Web3 from 'web3'
import {Buffer} from "buffer";
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
import Contrato from '/build/contracts/Contrato.json'

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

        }else{
            window.alert('Contrato Inteligente no desplegado en esta red')
        }
    }

    constructor(props) {
    super(props);
    this.state = {
        
        hiddenFrame: false,
        buttonPressed: false,
        buffer: null,
        hHash:'',
        cuenta:'',
        contract:null,
        med:'',
        nombre:'',
        edad:'',
        diag:'',
        trat:'',
        dir:'',
        date:'',
        link:'',
        ind:'',
        sol:[null],}
    };
    

    consulta = async (event) => {
        event.preventDefault()
  
        const sol= await this.state.contract.methods.getRecords(this.state.cuenta).call()
        console.log(sol)
        console.log(sol[0][1])
        this.setState({sol})
        this.setState({buttonPressed: true}) 
        
    }

     elegir = async (event,param) => {
        event.preventDefault()
        console.log(this.state.ind)

        const sol= await this.state.contract.methods.getRecords(this.state.cuenta).call()
        console.log(sol)
        console.log(sol[this.state.ind][1])
        this.setState({sol})
        const link='https://ipfs.io/ipfs/'+ sol[this.state.ind][7]
        this.setState({link})
        console.log(link)
        this.setState({hiddenFrame: true}) 
        this.setState({med: sol[this.state.ind][1]}) 
        this.setState({nombre: sol[this.state.ind][2]}) 
        this.setState({edad: sol[this.state.ind][3]})
        this.setState({diag: sol[this.state.ind][4]}) 
        this.setState({trat: sol[this.state.ind][5]}) 
        this.setState({date: sol[this.state.ind][6]})  
        
    }



   

  render() {
    return (
       
            <Container maxWidth="sm">
      <Typography
        variant="h6"
        component="a"
        
        sx={{
          mt: 11,
          mr: 2,
          display: { md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Consulta </Typography>

        <br/>

           {this.state.hiddenFrame && <Typography textAlign= 'center'>Expediente Clinico Electronico</Typography>} <br/>
        {this.state.hiddenFrame && <Typography>Medico que atendió: {this.state.med}</Typography>} <br/>
        {this.state.hiddenFrame && <Typography>Nombre del paciente: {this.state.nombre}</Typography>} <br/>
        {this.state.hiddenFrame && <Typography>Edad del paciente: {this.state.edad}</Typography>} <br/>
        {this.state.hiddenFrame && <Typography>Diagnostico del paciente: {this.state.diag}</Typography>} <br/>
        {this.state.hiddenFrame && <Typography>Tratambiento del paciente: {this.state.trat}</Typography>} <br/>
        {this.state.hiddenFrame && <Typography>Fecha en que se realizó: {this.state.date}</Typography>} <br/>

        { this.state.hiddenFrame &&  
        <iframe textAlign= 'center' width="100%" height="500pp" src={this.state.link}  ></iframe>
        } <br/>

         <Stack sx={{ mt: 2, justifyContent: "end"  }} direction="row" spacing={2}>
          <Button variant="contained" onClick={this.consulta}>
          Consulta
          </Button>
        </Stack>

        { this.state.buttonPressed &&
          <div>
            {this.state.sol.map((item, index) => (
              <Button variant="contained" key={index} onClick={(event) => this.elegir(event,this.setState({ind:index}))}>
                Expediente {index + 1}
              </Button>
            ))}
          </div>
           }
        {this.state.in}
        <br/>    
    </Container>
    );
  }
}

export default App;