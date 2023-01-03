import { Container, FormGroup, TextField, Typography } from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";

const RegistroMed = () => {
  return (
    <>
      <NavBar />
      <Container
        maxWidth="sm"
        sx={{
          mt: 15,
        }}
      >
        {/* <Layout>
          <label for="hash">Hash unica de cartera Ethereum:</label>
          <input type="text" id="hash" hash="hash" required size="30" />
          <label for="name">Nombre Completo: &nbsp;</label>
          <input type="text" id="name" name="name" required size="20" />
          <label for="clave">Clave de Empleado: &nbsp;</label>
          <input type="text" id="vlave" clave="clave" required size="20" />
        </Layout> */}

        <Typography>Registro de Personal de la Salud</Typography>

        <FormGroup>
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Hash unica de cartera Ethereum"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Nombre Completo"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Clave de Empleado"
            id=""
            // onChange={(event) => setMunicipio(event.target.value)}
          />
        </FormGroup>
      </Container>
    </>
  );
};

export default RegistroMed;
