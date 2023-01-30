import React from 'react'
import {useState} from 'react'

export default function boton() {

	async componentWillMount(){
        await this.loadWeb3()
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

 // Recolectar la información del formulario
    const nombre = document.getElementById("Nombre").value;
    const apellidos = document.getElementById("Apellidos").value;
    const telfono = document.getElementById("Telefono").value;
    const correo = document.getElementById("Correo").value;
    const Adress = document.getElementById("Adress").value;
    const Pass = document.getElementById("Pass").value;

	return (

		

	)
}