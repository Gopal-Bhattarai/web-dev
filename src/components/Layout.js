import { Box, Paper } from "@mui/material";
import Footer from "./Footer";
import NavBar from "./NavBar";
import SpeedDialComponent from "./utils/SpeedDialComponent";

const Layout = ({ children }) => {
  return (
    <Box>
      <Box display='flex' justifyContent='center'>
        <NavBar />
        {children}
        <SpeedDialComponent />
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
