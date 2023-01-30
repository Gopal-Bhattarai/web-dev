import { Box, Paper } from "@mui/material";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <Box>
      <Box display='flex' justifyContent='center'>
        <NavBar />
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
