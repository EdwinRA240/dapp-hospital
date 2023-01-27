import {
  Button,
  Container,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";

const RegistroPat = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Container
        maxWidth="sm"
        sx={{
          mt: 10,
        }}
      >
        <Typography>Registro de Paciente</Typography>

        <FormGroup>
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Nombre"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Apellidos"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Numero de Telefono"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Correo Electronico"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Public Adress"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Contraseña"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
        </FormGroup>
        
        <Stack sx={{ mt: 2, justifyContent: "end"  }} direction="row" spacing={2}>
          <Button variant="contained">Send</Button>
          <Button>Reset</Button>
          <Button href="signin">Cancel</Button>
        </Stack>
      </Container>
    </>
  );
};

export default RegistroPat;
