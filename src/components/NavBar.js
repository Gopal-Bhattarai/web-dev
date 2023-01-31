import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "@/components/State/DarkModeContext";

import { useSession } from "next-auth/react";
import { UserContext } from "./State/UserContext";
import HomeMenu from "./AppBarItems/HomeMenu";
import AboutMenu from "./AppBarItems/AboutMenu";
import ContactMenu from "./AppBarItems/ContactMenu";
import CartMenu from "./AppBarItems/CartMenu";
import DarkModeIconMenu from "./AppBarItems/DarkModeIconMenu";
import UserOptionsMain from "./AppBarItems/UserOptions/UserOptionsMain";
import SignInMenu from "./AppBarItems/UserOptions/SignInMenu";
import Logo from "./AppBarItems/Logo";
import NavMenuMobile from "./AppBarItems/NavMenuMobile";


const NavBar = () => {
  const { setMode } = useContext(DarkModeContext);

  const { data: session, status } = useSession();
  const { getUser, user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getUserSessionData = async () => {
      const user = await getUser();
      setUser(user);
    };
    getUserSessionData();
  // eslint-disable-next-line
  }, []);

  return (
    <>
    <AppBar position="static">
      <Toolbar>

        <Box sx={{flexGrow:1, display: {xs: 'flex', md: 'none'}}}>
          <NavMenuMobile />
        </Box>

        {/* company logo, index.js */}
        <Logo />

        <Stack direction='row' spacing={5} sx={{display: { xs: 'none', md: 'flex' }, margin: 'auto', marginRight: '5%'}} >  
          <HomeMenu />
          <AboutMenu />
          <ContactMenu />
          <DarkModeIconMenu setMode={setMode} />
        </Stack>

        <CartMenu />

        {!session && status === "unauthenticated" ? (
          <SignInMenu />
        ) : (
          <UserOptionsMain user={user} />
        )}

      </Toolbar>
    </AppBar>
  </>
  );
};

export default NavBar;
