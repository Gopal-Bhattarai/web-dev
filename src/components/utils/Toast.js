import { Alert,  Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import { DarkModeContext } from "../State/DarkModeContext";

const Toast = () => {
  const { toast, setToast } = useContext(DarkModeContext)
  const {message, severity, show, timeout } = toast;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast(e=>({...e, show: false}))
  };

  return (
    <>
      <Snackbar autoHideDuration={timeout} 
      open={show} onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
