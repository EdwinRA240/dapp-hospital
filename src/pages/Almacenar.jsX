import React, {Component} from 'react';
import Web3 from 'web3'
import {Buffer} from "buffer";
window.Buffer = Buffer; 
import { create } from 'ipfs-http-client'
import Layout from "../components/Layout";
import Almacenar from '/build/contracts/Almacenar.json'


const projectid='2HE6500liSrLAhibQqMO1xM0bkq'
const projectsecret='1ec2056ba2d6fd362d71a52f4e5c6ed0'
const auth=
'Basic ' + Buffer.from(projectid + ':' + projectsecret).toString('base64');
const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https',
    headers: {
        authorization: auth,
    }, })


class App extends Component {

    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBloackchainData()
    }
    async loadBloackchainData(){
        const web3=window.web3
        const cuenta=await web3.eth.getAccounts()
        this.setState({cuenta: cuenta[0]})
        console.log(cuenta)
        const coneccion_id=await web3.eth.net.getId()
        console.log(coneccion_id)
        const coneccion_data=Almacenar.networks[coneccion_id]
        if(coneccion_data){
            const abi = Almacenar.abi
            console.log(abi)
            const direccion = coneccion_data.address
            const contract = new web3.eth.Contract(abi,direccion)
            this.setState({contract})
            console.log(contract)
            console.log('Hash recuperado de blockchain')
            const sol=contract.methods.obtener().call().then(console.log)
            console.log(sol)
            //const hHash = await contract.methods.obtener().call()
            //this.setState({hHash})
            
        }else{
            window.alert('Contrato Inteligente no desplegado en esta red')
        }
    }

    constructor(props) {
    super(props);
    this.state = {
        cuenta:'',
        contract:null,
        buffer: null,
        hHash:''
    };
    }

    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.send('eth_requestAccounts')
        }if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        }else{
            window.alert('Inicia sesion en Metamask')
        }
    }

    captureFile = (event) => {
    event.preventDefault()
    //proceso de carga de archivo a ipfs
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
        this.setState({buffer: Buffer(reader.result)})
    }
   }
    onSubmit = async (event) => {
        event.preventDefault()
        console.log("Mandando archivo ...");
        ipfs.add(this.state.buffer, (error, result) => {
            console.log("Ipfs result",result);
            const hHash = result[0].hash
            this.setState({hHash: hHash})
            if(error){
                console.error("error")
                return
            }
            this.state.contract.methods.set(hHash).send({from:this.state.cuenta}).then((r)=>{
                this.setState({hHash})
            })
        } )
    }


  render() {
    return (
       <Layout>
         Almacenar registro medico en IPFS
        <br/><br/><br/><label for="hash_p">Hash unica  de Ethereum: &nbsp;</label> 
         <input type="text" id="hash_p" hash_p="hash_p" required
          size="30"/>

         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="name_p">Nombre Completo de paciente: &nbsp;</label> 
         <input type="text" id="name_p" name_p="name_p" required
          size="20"/>

         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="clave_p">Numero de paciente: &nbsp;</label> 
         <input type="text" id="clave_p" clave_p="clave_p" required
        size="20"/>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="hospital">Nombre de Hospital: &nbsp;</label> 
         <input type="text" id="hospital" hospital="hospital" required
          size="20"/>

        <br/><br/><br/>
               <h2>Cargar Historial clinico</h2>
               &nbsp;
               <form onSubmit={this.onSubmit}  >
               <input type='file' onChange = {this.captureFile}/>
               <input type='Submit' onSubmit/>
        </form>
                <br/><br/><br/><hr2>hash expediente: {this.state.hHash}</hr2>
                <br/><br/><br/><hr2>hash usuario: {this.state.cuenta}</hr2>  
    </Layout>
    );
  }
}

export default App;