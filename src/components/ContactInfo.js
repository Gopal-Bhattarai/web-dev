import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { ContactDetail } from "./OwnerDetail"

const handleSubmit = () => {

}

const ContactInfo = () => {
  return (
	<form onSubmit={handleSubmit}>
		<Box mt={8}  maxWidth="1200px" mx={1}>
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
				<Typography variant='h4' sx={{mb:2}}>Get in Touch</Typography>
				<TextField label="Full Name" fullWidth autoComplete="none"/>
				<TextField sx={{my:3}} label="Email" fullWidth autoComplete="none"/>
				<TextField label="Message" fullWidth multiline rows={5} autoComplete="none"/>
				<Button sx={{mt:5}} type="submit" variant="contained" fullWidth>send</Button>
			</Paper>
		</Box>
	</form>
  )
}

export default ContactInfo
