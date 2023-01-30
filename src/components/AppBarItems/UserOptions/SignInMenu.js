import { Avatar, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";

const SignInMenu = () => {
  return (
    <Link href="/login">
      <Tooltip title="Sign in">
        <IconButton>
          <Avatar />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default SignInMenu;
