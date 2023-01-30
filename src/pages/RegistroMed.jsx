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
        }else{
            window.alert('Contrato Inteligente no desplegado en esta red')
        }
    }

    enviar = async (event) => {
        event.preventDefault()
        this.setState({nombre: document.getElementById("nombre").value})
        this.setState({apellidos: document.getElementById("apellidos").value})
        this.setState({telefono: document.getElementById("telefono").value})
        this.setState({correo: document.getElementById("correo").value})
        this.setState({address: document.getElementById("address").value})
        this.setState({pass: document.getElementById("pass").value})
        this.setState({id: document.getElementById("id").value})
        this.setState({esp: document.getElementById("esp").value})

        if (this.state.cuenta==this.state.address){
                this.state.contract.methods.addMed(this.state.nombre, this.state.apellidos, this.state.telefono,this.state.address,
                this.state.correo,this.state.pass,this.state.id,this.state.esp).send({from:this.state.cuenta}).then((r) => {
                  window.alert('Registro existoso')
                  window.location.assign("signin")
                })
        } else{
            console.log("La public address ingresada no coincide con la de la cuenta activa de metamask")
        }
    }
       

    constructor(props) {
    super(props);
    this.state = {

        nombre:'',
        apellidos:'',
        telefono:'',
        correo:'',
        address:'',
        pass:'',
        cuenta:'',
        id:'',
        esp:'',
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
        <Typography>Registro de Personal Medico</Typography>

        <FormGroup>
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Nombre"
            id="nombre"
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Apellidos"
            id="apellidos"
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Numero de Telefono"
            id="telefono"
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Correo Electronico"
            id="correo"
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="ID de empleado"
            id="id"
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Especialidad"
            id="esp"
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Public Adress"
            id="address"
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Contraseña"
            id="pass"
          />
        </FormGroup>

        
        <Stack sx={{ mt: 2, justifyContent: "end"  }} direction="row" spacing={2}>
          <Button onClick={this.enviar} variant="contained">Crear</Button>
          <Button>Reset</Button>
          <Button href="signin">Cancel</Button>
        </Stack>
         
      </Container>
    </>
    );
  }
}

export default App;
