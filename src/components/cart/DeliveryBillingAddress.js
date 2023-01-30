import { Box, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";


const DeliveryBillingAddress = () => {
    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

  return (
    <Box display="flex" justifyContent="center" marginTop={4} mx={2}>
    <Paper sx={{ minWidth: "360px", maxWidth: "900px", padding: 2 }}>
    <Stack spacing={1} px={2}>
        <Typography variant="overline">
        Delivery & Billing Address
        </Typography>
        <TextField
        size="small"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        />
        <TextField
        size="small"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Street address, ward no."
        />
        <TextField
        size="small"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City and delivery contact no."
        />
        <TextField
        size="small"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        />
        <TextField
        size="small"
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile number"
        />
    </Stack>
    </Paper>
</Box>
  )
}

export default DeliveryBillingAddress
