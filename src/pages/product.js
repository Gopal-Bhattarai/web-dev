import { KeyWords, MetaTag, Title } from '@/components/OwnerDetail'
import ProductItemView from '@/components/ProductItemView'
import { ProductContext } from '@/components/State/ProductContext'
import { Box } from '@mui/material'
import Head from "next/head"
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const Product = () => {
    const router = useRouter()
    const productid = router.query.id;
  
    const {product, getProduct} = useContext(ProductContext)
    
    useEffect(()=>{
      productid ? getProduct(productid) : void 0
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productid])
    
  return (
    <>
      <Head>
        <title>{Title}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={KeyWords} />
        <meta name="description" content={MetaTag} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box mt={2}>
    
          {productid && product && 
            <ProductItemView product={product} />
          }

    </Box>

    </>
  )
}

export default Product
