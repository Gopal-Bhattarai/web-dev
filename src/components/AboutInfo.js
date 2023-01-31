import { Box, Paper, Stack, Typography } from "@mui/material"
import {Name, Motto} from './OwnerDetail'

const AboutInfo = () => {
  return (
    <Stack sx={{p:3}}>
      <Typography variant="h3" gutterBottom>About {Name} </Typography>
      <Box display="fles" justifyContent="center" alignItems="center">

      </Box>
      <Typography variant="h4" sx={{m:2, color: 'navy'}}>{Motto}</Typography>
        <Typography  sx={{m:2}}>Committed for definite health, prosperity and knowledge. 
            Our first mission is to provide you clinically relevant nutraceuticals and cosmaceuticals for well being and being young,</Typography> 
        <Typography  sx={{m:2, pb:20}}>Secondly to give you low cost opportunity to become successful self employed and finally to teach, train & motivate you to build your business for your definite success..</Typography>

    </Stack>
  )
}

export default AboutInfo
