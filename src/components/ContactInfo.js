import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { ContactDetail } from "./OwnerDetail"
import { DarkModeContext } from "./State/DarkModeContext";
import Toast from "./utils/Toast";


const ContactInfo = () => {
	const [fullName, setFullName]= useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const {setToast} = useContext(DarkModeContext)

	const handleSubmit = (e) => {
		e.preventDefault();

		const sendEmail = async () => {
			const response = await fetch('api/contact',{
				method: 'POST',
				headers: {
					'Content-Type' : 'application/json',
				},
				body: JSON.stringify({fullName, email, message})
			})
			const json = await response.json();
			setToast((e)=>({...e, show: true, severity: 'info', message: json.status}))
			console.log(json);
		}
		sendEmail();
	}

	return (
		<Box mt={8}  maxWidth="1200px" mx={1}>
			<Toast />
			{/* <Button onClick={()=>setToast((e)=>({...e, show: true}))}>show toast</Button> */}
			<Stack direction={{xs: "column", md : "row"}} 
			alignItems='center'
			justifyContent={{xs: "center", md : "space-between"}} my={2} p={2}>

				<Paper elevation={5} sx={{my:2}}>
					<Box width="200px" height="100px" border={1} borderRadius={2} padding={2}>
							<Typography variant='overline'>Address</Typography>
							<Typography variant='body2'>{ContactDetail.address}</Typography>	
					</Box>
				</Paper>

				<Paper elevation={5} sx={{my:2}}>
					<Box width="200px" height="100px" border={1} borderRadius={1} padding={2}>
							<Typography variant='overline'>Email</Typography>
							<Typography variant='body2'>{ContactDetail.email}</Typography>	
					</Box>
				</Paper>

				<Paper elevation={5} sx={{my:2}}>
					<Box width="200px" height="100px" border={1} borderRadius={2} padding={2}>
							<Typography variant='overline'>Contact</Typography>
							<Typography variant='body2'>{ContactDetail.phone}</Typography>	
					</Box>
				</Paper>
			</Stack>

			<Paper sx={{p:5}}>
				<form onSubmit={handleSubmit}>
				<Typography variant='h4' sx={{mb:2}}>Get in Touch</Typography>
				<TextField value={fullName} onChange={(e)=>setFullName(e.target.value)} label="Full Name" fullWidth autoComplete="none" required/>
				<TextField type = "email" value={email} onChange={(e)=>setEmail(e.target.value)} sx={{my:3}} label="Email" fullWidth autoComplete="none" required/>
				<TextField value={message} onChange={(e)=>setMessage(e.target.value)} label="Message" fullWidth multiline rows={5} autoComplete="none" required/>
				<Button sx={{mt:5}} type="submit" variant="contained" fullWidth>send</Button>
				</form>
			</Paper>
		</Box>
  )
}

export default ContactInfo
