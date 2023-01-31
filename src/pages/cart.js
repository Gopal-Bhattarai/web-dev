import AddRemoveQty from "@/components/cart/AddRemoveQty";
import DeliveryBillingAddress from "@/components/cart/DeliveryBillingAddress";
import ProductDetail from "@/components/cart/ProductDetail";
import ProductImage from "@/components/cart/ProductImage";
import TransactionDetails from "@/components/cart/TransactionDetails";
import { ProductContext } from "@/components/State/ProductContext";
import {
  Box,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { useContext, useEffect, } from "react";

export default function Checkout() {
  const { selectedProducts,productsInfo, getProductsFromCart } = useContext(ProductContext);

  useEffect(() => {
    getProductsFromCart()
  }, [selectedProducts]);



  return (
    <Box sx={{ mt: 7, py:3, px:5}}>
      {!productsInfo.length && <Box>No Products in your shopping cart</Box>}
      {productsInfo.length &&
        productsInfo.map((product) => (
          <Box
            key={product._id}
            sx={{ mb: 2}}
            // display="flex"
            // justifyContent="center"
            // alignItems="center"
          >

                  <Stack
                    direction={{sx:'column', sm:'row', md:'row'}}
                    spacing={{ xs: 1, sm: 2, md: 4 }}  
                    display = 'flex'          
                    justifyContent="space-between"
                    alignItems="center"
                  >

                  <Stack direction={{sx:'column', sm:'row', md:'row'}} alignItems="center" justifyContent='center' spacing={{ xs: 1, sm: 2, md: 4, lg: 10, xl: 20 }}   >
                    <ProductImage product={product}  source={'cart'}  />
                    <ProductDetail product={product}/>
                  </Stack>

                  <Stack>
                    <AddRemoveQty product={product} btnSize={'large'} />
                  </Stack>

                  </Stack>
          </Box>
        ))}

      <Grid container alignItems="center" justifyContent="center">
        <DeliveryBillingAddress />
        <TransactionDetails typo={'h6'} message={'confirm order'} mw={'300px'}  />
      </Grid>
    </Box>
  );
}
