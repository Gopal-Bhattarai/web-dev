import { useTheme } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BlackLogo, WhiteLogo } from '../OwnerDetail'

const Logo = () => {
    const theme = useTheme();

    return (
    <Link rel="preload" href="/" as="image">
    <Image
      priority
      src={theme.palette.mode === "light" ? WhiteLogo : BlackLogo}
      width="120"
      height="48"
      alt="Logo"
    />
  </Link>
  )
}

export default Logo
