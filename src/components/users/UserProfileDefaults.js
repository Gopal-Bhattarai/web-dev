import { Box, Divider, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { UserContext } from "../State/UserContext"

const UserProfileDefaults = () => {

    const { user } = useContext(UserContext)

  return (
    <Stack
        my={2}
        direction={{xs: 'column', sm: 'row'}}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs:0, sm:2}}
            >

            <Typography color="secondary" variant="button">
            {user.role}{" "}
            </Typography>

            <Typography variant="body2">ID : {user._id}</Typography>

            <Typography variant="body2">
            Active Since: {user.createdAt}
            </Typography>

            <Box>
                {user.email}
            </Box>

    </Stack>
  )
}

export default UserProfileDefaults
