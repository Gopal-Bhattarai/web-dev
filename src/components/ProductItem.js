import { Share} from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Rating, Typography } from "@mui/material"
import { useContext } from "react"
import { ProductContext } from "./State/ProductContext"

export default function ProductItem({product}) {
  const {setSelectedProducts} = useContext(ProductContext)
  
  const addProduct=()=>{
    setSelectedProducts(prev=>[...prev,product._id])
  }

  return (
        <Card sx={{maxWidth: 345, height: 320, marginBottom:4}} elevation={10}>
          <CardMedia sx={{height: 140}}
            image={`/products/${product._id}/${product.avatar}`} 
            title={product.productName} />

          <CardContent sx={{height: 80}}>
              <Typography gutterBottom variant="h5" component="div">
                {product.productName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                  {product.description.substring(0,40)}
              </Typography>

          </CardContent>


          <CardActions>
                <Rating value={product.rating? product.rating : Math.floor(Math.random() * 5) + 1} 
                sx={{color: '#2196f3'}} readOnly/>

            <IconButton aria-label="share">
              <Share />
            </IconButton>
            <Button onClick ={addProduct}>+ Add to cart</Button>
          </CardActions>

         </Card>
    )
}