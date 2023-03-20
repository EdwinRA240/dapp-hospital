import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainMed from "./pages/MainMed";
import MainPat from "./pages/MainPat";
import NotFound from "./pages/NotFound";
import Consultar from "./pages/Consultar";
import ConsultarPat from "./pages/ConsultarPat";
import Index from "./pages/Index";
import RegistroMed from "./pages/RegistroMed";
import RegistroPat from "./pages/RegistroPat";
import PassPat from "./pages/PassPat";
import PassMed from "./pages/PassMed";
import NavBarMed from "./components/NavBarMed";
import NavBar from "./components/NavBar";
import NavBarPat from "./components/NavBarPat";
import Almacenar from "./pages/Almacenar";
import SignIn from "./pages/SignIn";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NoAuth from "./components/NoAuth";

// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#6C1D45",
    },
    secondary: {
      main: "#8C1858",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<><NotFound/> <NavBar/></>} />
          <Route path="/NoAuth" element={<><NoAuth/> <NavBar/></>} />
          <Route path="/" element={<><Index /> <NavBar /></>}  />
          <Route path="/Signin" element={<><SignIn/><NavBar/> </>}/>
          <Route path="/PassPat" element={<PassPat />}/>
          <Route path="/PassMed" element={<PassMed />}/>
          <Route path="/MainMed" element={<MainMed />} />
          <Route path="/MainPat" element={<MainPat />} />
          <Route path="/Consultar" element={<><Consultar/> <NavBarMed/></>} />
          <Route path="/ConsultarPat" element={<><ConsultarPat/> <NavBarPat/></>} />
          <Route path="/Almacenar" element={<><Almacenar/> <NavBarMed/></>} />
          <Route path="/registroMed" element={<><RegistroMed/> <NavBar/></>} />
          <Route path="/registroPat" element={<><RegistroPat/> <NavBar/></>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
);
