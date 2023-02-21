import { Modal,
Typography,
Button, } from '@mui/material';
import React, { useState } from 'react';

const MyModal = (props) => {

  const { open, onClose, message,message2,message3,message4,message5,message6,message7,message8,message9 } = props;
  const link ='https://ipfs.io/ipfs/'+message9
  console.log(link)
  

  const customStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  };
  
  const frameStyle = {
    width: '50%',
    height: '500px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textContainerStyle = {
    flex: 1,
    margin: '20px',
  };

  return (
    <Modal open={open} onClose={onClose} style={customStyle}>
      <div style={containerStyle}>
        <div style={textContainerStyle}>
          <Typography textAlign='center'>Expediente Clinico Electronico</Typography>
          <Typography>Medico que atendió: {message}</Typography>
          <Typography>Nombre del paciente: {message2}</Typography>
          <Typography>Edad del paciente: {message3}</Typography>
          <Typography>Diagnostico del paciente: {message4}</Typography>
          <Typography>Tratambiento del paciente: {message5}</Typography>
          <Typography>Fecha en que se realizó: {message6}</Typography>
          <Typography>Estado: {message7}</Typography>
          <Typography>Notas adicionales: {message8}</Typography>
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
