import { Container, Typography } from "@mui/material";
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
        const abi = Contrato.abi
        const direccion = coneccion_data.address
        const contract = new web3.eth.Contract(abi,direccion)
        this.setState({contract})
        console.log(contract)
        const solo=await contract.methods.getPatientInfo(cuenta[0]).call()
        console.log(solo[0])
        this.setState({solo})
        console.log(solo)

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
        solo:'',
        contract:null
        
    };
    }


   

  render() {
    return ( 
<>
      <Container maxWidth="sm">
        <Typography
          variant="h6"
          component="a"
          href="/main"
          sx={{
            mt: 20,
            mr: 2,
            display: { md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Bienvenido !!!
          <br/>
          {this.state.solo[0]} {" "} {this.state.solo[1]}
          <br/>
          Address: {this.state.cuenta}
          <br/>
        </Typography>
      </Container>
    </>
    );
  }
}

export default App;