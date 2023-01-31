import { Box, Grid } from "@mui/material"
import Image from "next/image"
import Link from "next/link"


const ProductImage = ({product, source}) => {
  return (
    <Grid item xs={4} sm={4} md={4}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Link href={`/product?id=${product._id}`}>
        <Box 
          overflow="hidden"
          width={ source==='cart' ? "150px" : "50px" }
          height={ source==='cart' ? "150px" : "50px" }
          boxShadow= { source==='cart' ? "0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;" : "0px 0px 5px gray" }
          borderRadius= { source==='cart' ? "5px" : "50%" }
        >
          <Image
            width={ source==='cart' ? "150" : "50" }
            height={ source==='cart' ? "150" : "50" }
            src={`/products/${product._id}/${product.avatar}`}
            alt={product.productName}
            objectfit="cover"
          />
        </Box>
      </Link>
    </Box>
  </Grid>
  )
}

export default ProductImage
