import React, { useContext } from "react";
import { UserContext } from "../../components/State/UserContext";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import UpdateAvatar from "@/components/users/UpdateAvatar";
import UpdateProfile from "@/components/users/UpdateProfile";
import UserProfileDefaults from "@/components/users/UserProfileDefaults";
import { useRouter } from "next/router";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const router = useRouter()

  !user ? router.push('/login') : void 0

  return (
    <Box sx={{ mt: 10 }} >
      {user && user._id && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h3" mb={5}>{user.fullName}</Typography>

            <UserProfileDefaults /> 
            <Divider />

          <Stack
            mt={3}
            spacing={1}
            direction={{xs: 'column', sm: 'row'}}
            alignItems="center"
            justifyContent={{xs: 'center', sm: 'space-around'}}
            divider={<Divider flexItem />}
                >

            <UpdateProfile />

            <UpdateAvatar />

          </Stack>
        </Card>
      )}
    </Box>
  );
};

export default UserProfile;
