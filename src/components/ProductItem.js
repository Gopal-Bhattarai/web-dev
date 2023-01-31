import { Share} from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Rating, Stack, Typography } from "@mui/material"
import Link from "next/link"
import { useContext } from "react"
import { ProductContext } from "./State/ProductContext"

export default function ProductItem({product}) {
  const {setSelectedProducts} = useContext(ProductContext)
  
  const addProduct=()=>{
    setSelectedProducts(prev=>[...prev,product._id])
  }

  return (
        <Card sx={{width: 345, height: 320, marginBottom:4}} elevation={10}>
          <Link href={`/product?id=${product._id}`} >
            <CardMedia sx={{height: 140}}
              image={`/products/${product._id}/${product.avatar}`} 
              title={product.productName} />
          </Link>

          <CardContent sx={{height: 80}}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography gutterBottom variant="h5" component="div">
                {product.productName}
              </Typography>
              <Chip label={`Rs. ${product.price.toLocaleString() }`}  color="warning" variant="filled"
                clickable   />
            </Stack>
              <Typography variant="body2" color="text.secondary">
                  {product.description.substring(0,40)}
              </Typography>

          </CardContent>


          <CardActions>
            <Rating size="small" value={product.rating? product.rating : Math.floor(Math.random() * 5) + 1} 
                sx={{color: '#2196f3'}} readOnly/>

            <IconButton sx={{flexGrow:1}} aria-label="share">
              <Share />
            </IconButton>
            <Button  sx={{flexGrow:1}} onClick ={addProduct}>+ Add</Button>
          </CardActions>

         </Card>
    )
}