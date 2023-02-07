import {
  Button,
  Container,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, {Component} from 'react';
import NavBar from "../components/NavBar";
import { useState } from "react";
import Contrato from '/build/contracts/Contrato.json'
import Web3 from 'web3'


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
            const sol=await contract.methods.getMedInfo(cuenta[0]).call()
            console.log(sol)
            this.setState({sol})
        }else{
            window.alert('Contrato Inteligente no desplegado en esta red')
        }
    }

    handleChange = async (event) => {
        event.preventDefault()
        this.setState({correo: document.getElementById("correo").value})
        this.setState({address: document.getElementById("address").value})

        

    }

    enviar = async (event) => {
        event.preventDefault()

        if (this.state.cuenta==this.state.address){
            if (this.state.sol[4]==this.state.correo){

                this.setState({buttonPressed: true}) 
                this.setState({buttonPressed2: false}) 
                           
            } else{
                window.alert("El correo ingresado no es el de esta cuenta")
            }      
                
        } else{
            window.alert("La public address ingresada no coincide con la de la cuenta activa de metamask")
        }

    }
       

    constructor(props) {
    super(props);
    this.state = {

        buttonPressed: false,
        buttonPressed2: true,
        nombre:'',
        apellidos:'',
        telefono:'',
        correo:'',
        address:'',
        pass:'',
        cuenta:'',
        sol:[],
        contract:null
        
    };
    }
   

  render() {
    return ( 
      <>
      <NavBar />
      <Container
        maxWidth="sm"
        sx={{
          mt: 15,
        }}
      >
        <Typography>Recuperar contraseña</Typography>
        { this.state.buttonPressed2 &&  
        <FormGroup >
      
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Correo Electronico"
            id="correo"
            onChange={this.handleChange}
          />
         
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Public Adress"
            id="address"
            onChange={this.handleChange}
          />
        </FormGroup>
        } 

        {this.state.buttonPressed && <Typography sx={{ mt: 2 }}>Tu contraseña es: {this.state.sol[5]}</Typography>} <br/>

        
        <Stack sx={{ mt: 2, justifyContent: "end"  }} direction="row" spacing={2}>
          <Button  onClick={this.enviar} variant="contained">Recuperar</Button>
          <Button href="signin">Regresar</Button>
        </Stack>
         
      </Container>
    </>
    );
  }
}

export default App;