import React from 'react'
import {useState} from 'react'

export default function boton() {

	const [buttonText, setButtonText] = useState('Conexion a Metamask')
	const [cuenta, setCuenta] = useState(null)
	const conectar = () => {
		if(window.ethereum && window.ethereum.isMetaMask){
			window.ethereum.request({method: 'eth_requestAccounts'}).then(result  => {
			setAccount(result[0])
			setButtonText (null)
		})
			.catch(error  =>{
				setButtonText (error.message)
			})
	    } else{
		setButtonText ('Necesitas tener Metamask instalado')
	}
}

	return (

		<button onClick={conectar}>{buttonText}{cuenta}</button>

	)
}