import { Box, Link, Typography } from "@mui/material";
import React from "react";

const footer = () => {
  return (
    <>
      <Box sx={{ bgcolor: "background.paper", p: 3, mt: 0 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Proyecto de Titulación
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            www.esimecu.com.mx
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
};

export default footer;
