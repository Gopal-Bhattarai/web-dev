import AboutInfo from "@/components/AboutInfo"
import { KeyWords, MetaTag, Title } from '@/components/OwnerDetail'
import { Box } from "@mui/material"
import Head from "next/head"

const about = () => {
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
      <Box sx={{mt:5, mx:-1}}>
        <AboutInfo />
      </Box>
    </>
  )
}

export default about
