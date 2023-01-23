import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"DB_Sneaker "}
      <Link color="inherit" href="https://mui.com/"></Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function BasicGrid() {
  const [Data, setData] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setData({
      PublicAddress: data.get("Public Address Patient "),
      password: data.get("password"),
    });

    console.log(Data);
  };

  return (
    <Container fixed sx={{ flexGrow: 1, mt: 15, display: "flex", whiteSpace: "normal" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Item>
            {" "}
            <Container component="main" maxWidth="xs" sx={{ mt: 1, mb: 5 }}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Inicio de sesion de Pacientes
                </Typography>
                <Box
                  component="form"
                  onBlur={handleSubmit}
                  // onSubmit={handleSetData}
                  noValidate
                  href="/Empleado"
                  sx={{ mt: 1 }}
                >
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="useer"
                    label="Public Address Patient "
                    autoComplete="Public Address Patient "
                    autoFocus
                  />
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recuerdame"
                  />
                  <Button
                    type="submit"
                    href="/Sigin"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Iniciar Sesion
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/registroPat" variant="body2">
                        {"¿No tienes cuenta? Inscribete aqui"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
            {" "}
            <Container component="main" maxWidth="xs" sx={{ mt: 1, mb: 5 }}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Inicio de sesion de Personal Medico
                </Typography>
                <Box
                  component="form"
                  onBlur={handleSubmit}
                  // onSubmit={handleSetData}
                  noValidate
                  href="/Empleado"
                  sx={{ mt: 1 }}
                >
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="useer"
                    label="Public Address Doctor"
                    autoComplete="Public Address Doctor"
                    autoFocus
                  />
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recuerdame"
                  />
                  <Button
                    type="submit"
                    href="/Sigin"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Iniciar Sesion
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/registroMed" variant="body2">
                        {"¿No tienes cuenta? Inscribete aqui"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}