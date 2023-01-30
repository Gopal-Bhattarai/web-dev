import { Badge, Box, IconButton, styled } from '@mui/material'
import React, { useContext, useState } from 'react'
import CartDrawer from '../cart/CartDrawer';
import { ProductContext } from '../State/ProductContext';

const Cart = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30px;
  text-decoration: none;
  color: white;
  position: relative;
`;

const CartMenu = () => {
  const { selectedProducts } = useContext(ProductContext);

    //cart drawer state
    const [isDrawerOpen, setIsDrawerOpen]= useState(false)
    const handleDrawerClose  = () => {
      setIsDrawerOpen(false)
    }

  return (
    <>
    {isDrawerOpen && <CartDrawer action={handleDrawerClose} /> }
        <IconButton onClick={()=>setIsDrawerOpen(true)} sx={{display: { xs: 'none', md: 'flex' }}}>
          <Box mr={2}>
            <Badge color="primary" badgeContent={selectedProducts.length}>
              <Cart>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Cart>
            </Badge>
          </Box>
        </IconButton>
    </>
  )
}

export default CartMenu
