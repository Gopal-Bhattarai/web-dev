import styled from '@emotion/styled';
import { MenuItem, Typography } from '@mui/material'
import Link from 'next/link'

const TypoLink = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "white" : "black",
  }));
  
const UserProfileMenu = ({menuClose}) => {
  return (
    <MenuItem>
        <Link href="/user/userprofile" style={{ textDecoration: 'none' }}
         onClick ={()=>menuClose(true)}>
            <TypoLink> Profile</TypoLink>
        </Link>
    </MenuItem>
  )
}

export default UserProfileMenu
