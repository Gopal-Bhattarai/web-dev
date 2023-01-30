import { Box, Paper, Typography } from "@mui/material"

const ContactInfo = () => {
  return (
    <Paper sx={{px:3, py:5}}>
  
					<Box className="col-md-3 col-sm-4 wow fadeIn" data-wow-delay="0.9s">
						<Box>
							<h3>Visit Our Offices</h3>
							<Typography>Head Office: Dhumbarahi-4, Pipalbot, Kathmandu</Typography>
							<Typography>Branch Office: Chapagaundobato-Satdobato, Lalitpur</Typography>
							<Typography> 9843891333</Typography>
						</Box>
					</Box>
    </Paper>
  )
}

export default ContactInfo
