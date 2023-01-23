import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import MainPat from "./pages/MainPat";
import NotFound from "./pages/NotFound";
import Consulta from "./pages/Consulta";
import ConsultaPat from "./pages/ConsultaPat";
import Login from "./pages/Login";
import RegistroMed from "./pages/RegistroMed";
import RegistroPat from "./pages/RegistroPat";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
import NavBarPat from "./components/NavBarPat";
import Almacenar from "./pages/Almacenar";
// import SignIn from "./pages/SignIn";
import SignInCopy from "./pages/SignInCopy";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
          <Route path="*" element={<><NotFound/> <NavBar2/></>} />
          <Route path="/" element={<><Login /> <NavBar2 /></>}  />
          {/* <Route path="signin" element={<SignIn />} /> */}
          <Route path="signin" element={<><SignInCopy/><NavBar2/> </>}/>
          <Route path="/main" element={<><Main/> <NavBar/></>} />
          <Route path="/mainPat" element={<><MainPat/> <NavBarPat/></>} />
          <Route path="/consulta" element={<><Consulta/> <NavBar/></>} />
          <Route path="/consultaPat" element={<><ConsultaPat/> <NavBarPat/></>} />
          <Route path="/almacenar" element={<><Almacenar/> <NavBar/></>} />
          <Route path="/RegistroMed" element={<><RegistroMed/> <NavBar2/></>} />
          <Route path="/RegistroPat" element={<><RegistroPat/> <NavBar2/></>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
);
