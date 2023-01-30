import { Box, Drawer, Stack, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { ProductContext } from "../State/ProductContext"
import AddRemoveQty from "./AddRemoveQty"
import ProductImage from "./ProductImage"
import TransactionDetails from "./TransactionDetails"

const CartDrawer = ({action}) => {

const {getProductsFromCart, selectedProducts, productsInfo} = useContext(ProductContext)

useEffect(()=>{
    getProductsFromCart();
},[selectedProducts])

  return (
    <Drawer anchor='right' open={true} onClose={()=>action(false)}>
        <Box p={2} width='250px' textAlign='center' role='cart'>

            {!productsInfo.length ? 
                <Box>
                    <Typography variant='h6' component='div'>
                        No Products in your list
                    </Typography>
                </Box>
                :
                <Box>
                    <Typography variant='h6' component='div'>
                        Selected Products...
                    </Typography>
                </Box>
            }
            
            {productsInfo.length && productsInfo.map(product=>(
                <Stack direction="row" key={product._id} my={2} spacing={2} alignItems='center' justifyContent='center'>
                    <ProductImage product={product} source={'drawer'} />
                    <AddRemoveQty product={product} btnSize={'small'} />
                </Stack>
            ))}
            
            <TransactionDetails action={action} typo={'body2'} message={'add delivery address'} mw={'235px'} />

            


        </Box> 
    </Drawer>
  )
}

export default CartDrawer
