import { Box, Card, Paper } from "@mui/material"
import Image from "next/image"
import Carousel from 'react-material-ui-carousel'

const Featured = () => {

    const images = [
        '/img/slider/bodylotion.png',
        '/img/slider/C3Power.png',
        '/img/slider/calcid.png',
        '/img/slider/chewable.png',
        '/img/slider/cleanser.png',
        '/img/slider/Colostrum.png',
        '/img/slider/CoQ.png',
        '/img/slider/CranDM.png',
        '/img/slider/facescrub.png',
        '/img/slider/Glyca.png',
        '/img/slider/intimatewash.png',
        '/img/slider/LivStrong.png',
        '/img/slider/mask.png',
        '/img/slider/NightCream.png',
        '/img/slider/Omega.png',
    ]
  return (
    <Carousel>

 
      {images.map(img=>(
        <Box display="flex" 
        alignItems="center"
        justifyContent="center" key={img} >
        <Card elevation={12} sx={{my:1, p:1,}}>
        <Image priority src = {img} alt = {img} width={640} height ={400} />
        </Card>
        </Box>
      ))}

    </Carousel>
  )
}

export default Featured
