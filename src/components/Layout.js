import { Box, Paper } from "@mui/material";
import { useContext } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { DarkModeContext } from "./State/DarkModeContext";
import SpeedDialComponent from "./utils/SpeedDialComponent";
import Toast from "./utils/Toast";

const Layout = ({ children }) => {

  return (
    <Box>
        <NavBar />

      <Box display='flex' justifyContent='center' alignItems='center'>
        {children}
        <SpeedDialComponent />
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
