import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Consulta from "./pages/Consulta";
import Login from "./pages/Login";
import RegistroMed from "./pages/RegistroMed";
import NavBar from "./components/NavBar";
// import Almacenar from "./pages/Almacenar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/consulta" element={<Consulta />} />
        {/* <Route path="/almacenar" element={<Almacenar />} /> */}
        <Route path="/registro" element={<RegistroMed />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
