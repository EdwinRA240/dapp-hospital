import { Modal,
Typography,
Button, } from '@mui/material';
import React from 'react';

const MyModal = (props) => {

  const { open, onClose, message,message2,message3,message4,message5,message6,message7,message8,message9 } = props;
  const link ='https://ipfs.io/ipfs/'+message9
  console.log(link)
  

  const customStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const frameStyle = {
    width: '50%',
    height: '90%',
    margin: '10px'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: '80%'
  };

  const textContainerStyle = {
    flex: 1,
    margin: '50px',
  };

  return (
    <Modal open={open} onClose={onClose} style={customStyle}>
      <div style={containerStyle}>
        <div style={textContainerStyle}>
          <Typography variant="h5" textAlign='center'>Expediente Clínico Electrónico</Typography><br/>
          <Typography>Médico que atendió: {message}</Typography><br/> 
          <Typography>Nombre del paciente: {message2}</Typography><br/> 
          <Typography>Edad del paciente: {message3}</Typography><br/> 
          <Typography>Diagnóstico del paciente: {message4}</Typography><br/> 
          <Typography>Tratamiento del paciente: {message5}</Typography><br/> 
          <Typography>Fecha en que se realizó: {message6}</Typography><br/> 
          <Typography>Estado: {message7}</Typography><br/> 
          <Typography>Notas adicionales: {message8}</Typography><br/> 
          <Button onClick={onClose} variant="contained">Cerrar</Button>
        </div>
        {message9 !== 'Sin archivo adjunto' ? (
          <iframe style={frameStyle} src={link} />
        ) : null}
      </div>
    </Modal>
  );
};

export default MyModal;
