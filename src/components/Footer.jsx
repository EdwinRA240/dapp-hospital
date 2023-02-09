import { Box, Link, Typography } from "@mui/material";
import React from "react";

const footer = () => {
  return (
    <>
      <Box sx={{ bgcolor: "background.paper", p: 3, mt: 4 }} component="footer">
        {/* <Typography variant="h6" align="center" gutterBottom>
          ESIMECU
        </Typography> */}
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Proyecto de Titulacion
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            esimecu.com
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
};

export default footer;
