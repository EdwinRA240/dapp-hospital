import { Modal, Typography, Button, Container, Box, Grid } from "@mui/material";
import React from "react";

const MyModal = (props) => {
  const { open, onClose, message, message2, message3, message4, message5, message6, message7, message8, message9 } =
    props;
  const link = "https://ipfs.io/ipfs/" + message9;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    heigth: "100%",
    bgcolor: "background.paper",
    border: "2px solid #0000",
    boxShadow: 50,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" align="center">
          Expediente Clínico Electrónico
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={6}>
            {/* <Typography sx={{ mt: 1 }}>Médico que atendió: {message}</Typography> */}
            <Typography sx={{ mt: 1 }}>Nombre del paciente: {message2}</Typography>
            <Typography sx={{ mt: 1 }}>Edad del paciente: {message3}</Typography>
            <Typography sx={{ mt: 1 }}>Diagnóstico del paciente: {message4}</Typography>
            <Typography sx={{ mt: 1 }}>Tratamiento del paciente: {message5}</Typography>
            <Typography sx={{ mt: 1 }}>Fecha en que se realizó: {message6}</Typography>
            <Typography sx={{ mt: 1 }}>Estado: {message7}</Typography>
            <Typography>Notas adicionales: {message8}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            {message9 !== "Sin archivo adjunto" ? (
              <Box sx={{ display: "flex", justifyContent: "center", minWidth: "10px" }}>
                <iframe src={link} />
              </Box>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MyModal;
