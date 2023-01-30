import { Box, Paper, Typography } from "@mui/material"
import Image from "next/image"

const AboutInfo = () => {
  return (
    <Paper sx={{p:3}}>
      <Typography variant="h1" gutterBottom>About Nepal Sami </Typography>
      <Box display="fles" justifyContent="center" alignItems="center">

      <Image src = '/img/doctorwithproducts.jpg' alt='products' width={600} height={400} />
      </Box>
      <Typography variant="h3" sx={{m:2}}>Health, Education & Prosperity</Typography>
        <Typography  sx={{m:2}}>Committed for definite health, prosperity and knowledge. 
            Our first mission is to provide you clinically relevant nutraceuticals and cosmaceuticals for well being and being young,</Typography> 
        <Typography  sx={{m:2, pb:20}}>Secondly to give you low cost opportunity to become successful self employed and finally to teach, train & motivate you to build your business for your definite success..</Typography>

    </Paper>
  )
}

export default AboutInfo
