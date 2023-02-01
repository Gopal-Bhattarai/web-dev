import { React, useEffect, useState } from "react";
import Image from "next/image";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Facebook,
  GitHub,
  Google,
  HowToReg,
  Key,
  VpnKeyOff,
} from "@mui/icons-material";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (session) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    };
    securePage();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ mt: 8, p: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper sx={{ padding: "16px" }} elevation={8}>
          <Typography variant="h4" gutterBottom>
            Welcome back
          </Typography>
          <Box my={3} width={{ xs: "300px", md: "900px" }} overflow="hidden">
            <Image
              priority
              src="/img/login.jpg"
              alt="login"
              width="900"
              height="300"
            />
          </Box>

          <Typography variant="h6" gutterBottom>
            Login using
          </Typography>
          <Stack direction={{ md: "row" }}>
            <Button onClick={() => signIn("google")}>
              <Google sx={{ mr: 1 }} /> Google
            </Button>
            <Button onClick={() => signIn("github")}>
              <GitHub sx={{ mr: 1 }} /> Github
            </Button>

            <Button onClick={() => signIn("facebook")}>
              <Facebook sx={{ mr: 1 }} /> Facebook
            </Button>
            <Button onClick={() => signIn("credential")}>
              <Key sx={{ mr: 1 }} /> Credentials
            </Button>
          </Stack>

          <Stack spacing={2} my={3}>
              <Button variant="contained" onClick={()=>router.push('/register')}>
                <HowToReg /> Register
              </Button>
            <Button variant="contained">
              <VpnKeyOff /> Forgot Password
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Paper>
  );
};

export default Login;
