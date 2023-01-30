import {  Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem,  styled,  Tooltip} from "@mui/material"
import { useContext, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { LINK_ITEM } from "./LINK_ITEM";
import Link from "next/link";
import { DarkModeContext } from "../State/DarkModeContext";
import DarkModeIconMenu from "./DarkModeIconMenu";
import { Flex } from "./MenuLinkStyle";


// const Flex = styled(Box)`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 40px;
//     text-decoration: none;
// `;



const NavMenuMobile = () => {

  const { mode, setMode } = useContext(DarkModeContext);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navLinkOnClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const navLinkOnClose = (e) => {
    setAnchorEl(null);
  };

  return (
    <>
            <Tooltip title="Navigation Link">
              <IconButton
                id="resources-button"
                onClick={navLinkOnClick}
                // aria-control={open ? "resources-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {/* display hamburgur menuicon in mobile */}
                <Box sx={{ flexGrow:1, display: {xs: 'flex', md: 'none'}}}>
                    {/* <IconButton size="large" onClick={navLinkOnClick} color="inherit"> */}
                        <MenuIcon onClick={navLinkOnClick} />
                    {/* </IconButton> */}
                </Box>
              </IconButton>
            </Tooltip>

            <Menu
              id="resources-menu"
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{ "aria-labelledby": "resources-button" }}
              onClose={navLinkOnClose}
            >
                { LINK_ITEM.map (link=>(

                    <Link href={link.link} key={link.name} style={{ textDecoration: 'none' }}
                    onClick ={navLinkOnClose}>
                        <MenuItem>
                            <ListItemIcon>
                                { link.icon }
                            </ListItemIcon>
                            <ListItemText inset>
                                <Flex sx={{ color: mode ? 'white' : 'black' }}>
                                { link.name }
                                </Flex>
                            </ListItemText>
                        </MenuItem>
                    </Link>
                ))}
                    <MenuItem>
                      <ListItemIcon>
                          <DarkModeIconMenu setMode={setMode} />
                      </ListItemIcon>
                      <ListItemText inset>
                        {mode? 'Light Mode' : 'Dark Mode'}
                      </ListItemText>
                    </MenuItem>
            </Menu>
            
          </>
  )
}

export default NavMenuMobile
