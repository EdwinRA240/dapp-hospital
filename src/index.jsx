import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import MainPat from "./pages/MainPat";
import NotFound from "./pages/NotFound";
import Consultar from "./pages/Consultar";
import ConsultarPat from "./pages/ConsultarPat";
import Index from "./pages/Index";
import RegistroMed from "./pages/RegistroMed";
import RegistroPat from "./pages/RegistroPat";
import PassPat from "./pages/PassPat";
import PassMed from "./pages/PassMed";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
import NavBarPat from "./components/NavBarPat";
import Almacenar from "./pages/Almacenar";
import SignIn from "./pages/SignIn";
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
          <Route path="/" element={<><Index /> <NavBar2 /></>}  />
          <Route path="signin" element={<><SignIn/><NavBar2/> </>}/>
          <Route path="PassPat" element={<><PassPat/><NavBar2/> </>}/>
          <Route path="PassMed" element={<><PassMed/><NavBar2/> </>}/>
          <Route path="/main" element={<><Main/> <NavBar/></>} />
          <Route path="/mainPat" element={<><MainPat/> <NavBarPat/></>} />
          <Route path="/Consultar" element={<><Consultar/> <NavBar/></>} />
          <Route path="/ConsultarPat" element={<><ConsultarPat/> <NavBarPat/></>} />
          <Route path="/Almacenar" element={<><Almacenar/> <NavBar/></>} />
          <Route path="/registroMed" element={<><RegistroMed/> <NavBar2/></>} />
          <Route path="/registroPat" element={<><RegistroPat/> <NavBar2/></>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
);
