import { Avatar, IconButton, Menu, Stack, Tooltip, Typography } from "@mui/material"
import { useState } from "react";
import SignOutMenu from "./SignOutMenu"
import UserProfileMenu from "./UserProfileMenu"

const UserOptionsMain = ({user}) => {

    //user loggedin menu (profile,logout etc)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userOptionsClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const userOptionsClose = (e) => {
    setAnchorEl(null);
  };


  return (
    <>
            <Tooltip title="User Options">
              <IconButton
                id="resources-button"
                onClick={userOptionsClick}
                // aria-control={open ? "resources-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Stack direction="column">
                    <Avatar
                      alt="LoggedIn"
                      src={user ? user.profile_pic : "/img/noImage.png"}
                      />
                    <Typography variant="caption">{user && user.fullName ? user.fullName.split(' ')[0] : null}</Typography>
                </Stack>
              </IconButton>
            </Tooltip>

            <Menu
              id="resources-menu"
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{ "aria-labelledby": "resources-button" }}
              onClose={userOptionsClose}
            >
              <UserProfileMenu menuClose={userOptionsClose} />
              <SignOutMenu />
            </Menu>
            
          </>
  )
}

export default UserOptionsMain
