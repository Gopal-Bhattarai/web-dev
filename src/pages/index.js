import Featured from '@/components/Featured'
import { KeyWords, MetaTag, Title } from '@/components/OwnerDetail'
import { Box, Paper } from '@mui/material'
import Head from 'next/head'


export default function Home() {
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
      <Box sx={{py:5, my:5, mx:-1 }} width={{xs: '360px', sm: '600px', md: '900px'}}>
       <Featured />
      </Box>
    </>
  )
}
