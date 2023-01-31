import { Home, Class, Category, Inventory2, AddShoppingCart } from "@mui/icons-material"
import { Box, Breadcrumbs, Button, Divider, ImageList, ImageListItem, Paper, Rating, Stack, Typography } from "@mui/material"
import Image from "next/image"
import Link from 'next/link'
import { useContext, useEffect, useState } from "react"
import AddRemoveQty from "./cart/AddRemoveQty"
import { ProductContext } from "./State/ProductContext"


const ProductItemView = ({product}) => {

    const [thumbImage, setThumbImage] = useState('')
    const {selectedProducts, setSelectedProducts} = useContext(ProductContext)
    const [sellerName, setSellerName] = useState('')

    const getSellerName = async () => {
        await fetch(`/api/users/id/${product.user}`)
        .then(response=>response.json())
        .then(json=>setSellerName(json.user))
    }
    useEffect(()=>{
        getSellerName();
        // eslint-disable-next-line
    },[product.image])

    useEffect(()=>{
        setThumbImage(product.avatar)
        // eslint-disable-next-line
    },[product.image])

    console.log('thumb',thumbImage);
    console.log('image',product.image[0]);


  return (
    <Box width={{xs: '320px', sm: '600px', md: '1024px', lg: '1200px', xl: '1500px'}}>
        <Breadcrumbs aria-label="breakcrumb">
        <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/home"
            >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
        </Link>

        <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href={`/home?brand=${product.brand}`}
            >
            <Class sx={{ mr: 0.5 }} fontSize="inherit" />
              Brand
        </Link>

        <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href={`/home?brand=${product.category}`}
            >
            <Category sx={{ mr: 0.5 }} fontSize="inherit" />
              Category
        </Link>

        <Typography sx={{display: 'flex', alignItems: 'center'}} color="text.primary">
            <Inventory2 sx={{ mr: 0.5 }} fontSize="inherit" />
            {product.productName}
        </Typography>
        
        </Breadcrumbs>

    <Stack direction={{xs:"column", md:"row"}} spacing={2} justifyContent='space-around' alignItems='center'>
        <Box  display={{xs: 'none', md: 'flex'}}>
            <ImageList sx={{ width: 300, height: 400 }} variant='quilted' cols={3} rowHeight={120}>
                {product.image.map((item,i)=>(
                    <ImageListItem key={i} onClick={()=>setThumbImage(item)}>
                        <img src={`/products/${product._id}/${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`/products/${product._id}/${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item}
                        loading="lazy" />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>

        <Box border={1} borderRadius={5} overflow='hidden'  width={{xs: '300px', md: '450px'}} height={{xs: '300px', md: '450px'}} alignItems='center' position='relative' >
            <Image src={`/products/${product._id}/${thumbImage}`} alt={product.productName} fill/>
        </Box>

        <Stack>
            
            <Typography variant='h3'>{product.productName}</Typography>
            
            <Rating value={product.rating} sx={{color: '#2196f3'}} readOnly />
            <Divider />
            <hr />

            <Typography variant='h6'>Rs. {product.price.toLocaleString()}</Typography>


            <Typography variant='overline'>Brand: {product.brand}</Typography>
            <Typography variant='overline'>Category: {product.category}</Typography>
            <Typography variant='overline'>Stock: {product.quantityInStock > 0 ? `Available, ${product.quantityInStock} in stock` : 'Out of Stock'}</Typography>
            <Typography variant='overline'>Seller: {sellerName}</Typography>

            <Box my={2}>
                {selectedProducts.find(e=>e===product._id) ? 
                    <AddRemoveQty product={product} btnSize={'small'}/> 
                : <Button variant="contained" onClick={()=>setSelectedProducts(prev=>[...prev,product._id])}>
                    <AddShoppingCart /> Add to Cart</Button>
                }
            </Box>
            
        </Stack>


    </Stack>
        <Box>
            <Typography variant='overline'>Product Detail</Typography>
            <Typography variant='body1' dangerouslySetInnerHTML={{ __html: product.description }}></Typography>
            {/* <div dangerouslySetInnerHTML={product.description} />  */}
        </Box>

    </Box>
  )
}

export default ProductItemView
