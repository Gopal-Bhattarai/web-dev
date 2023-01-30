import { MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";

const SignOutMenu = () => {
  return (
    <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
    </MenuItem>
  )
}

export default SignOutMenu
