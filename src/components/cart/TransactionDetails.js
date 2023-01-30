import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { ProductContext } from "../State/ProductContext";

const TransactionDetails = ({action, typo, message,mw}) => {
  const router = useRouter()

  const {subtotal, delivery, total} = useContext(ProductContext)

  const redirect = () => {
    if(router.pathname!=='/cart'){
      router.push('/cart')
    }
    action(false)
  }
  
  return (
    <Box display="flex" justifyContent="center" marginTop={4}>
      <Paper sx={{ minWidth: mw, maxWidth: "900px", padding: 2 }}>
        <Typography variant="button" gutterBottom>
          Transaction Details
        </Typography>
        
        <Box display="flex" justifyContent={"space-between"} mt={2}>
          <Typography variant={typo}>Sub-Total</Typography>
          <Typography variant={typo}>Rs. {subtotal.toLocaleString()}</Typography>
        </Box>
        <Box display="flex" justifyContent={"space-between"}>
          <Typography variant={typo}>Delivery Charges</Typography>
          <Typography variant={typo}>Rs. {delivery.toLocaleString()}</Typography>
        </Box>

        <Divider sx={{ my: 1}} />

        <Box display="flex" justifyContent={"space-between"}>
          <Typography variant={typo}>Total</Typography>
          <Typography variant={typo}>Rs. {total.toLocaleString()}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="center" marginTop={5}>
          <Button variant="contained" onClick={redirect}>
            {message}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TransactionDetails;
