import { Box, Button, FormControlLabel, Stack, Switch, TextField } from "@mui/material"
import { UserProfileUpdateAPI } from "APIs/UserProfileAPI";
import { useContext, useState } from "react";
import { UserContext } from "../State/UserContext";

const UpdateProfile = () => {

  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  // This variable determines whether password is shown or not
  const [isShown, setIsShown] = useState(false);

    //function to call axios to backend API to change fullName & Password
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
          return null; //notify({title: 'Oooops', message: `Passwords do not matched`, color:'red', icon: <IconX /> })
        }

        await UserProfileUpdateAPI({
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          password: password,
        })
          .then((response) => {
            //   updateNotify({id: 'load-data', title: 'Success', message: response.data.status , icon: <IconCheck size={20} /> })
            //setUser(response.data.user);
          })
          .catch((error) => {
            // notify({title: 'Oooops', message: 'error.response.data', color:'red', icon: <IconX /> })
            console.log(error);
          });
      };
    
      // This function is called when the show password checkbox is checked or unchecked
      const togglePassword = () => {
        setIsShown((isShown) => !isShown);
      };

  return (
    <Stack spacing={2} m={2}>
    <Box>
      {user._id && (
        <TextField
          label="Full Name"
          value={user.fullName}
          onChange={(e) =>
            setUser({ ...user, fullName: e.target.value })
          }
          required
        />
      )}
    </Box>
    <Box>
      <TextField
        label="Password"
        type={isShown ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </Box>
    <Box>
      <TextField
        label="Confirm Password"
        type={isShown ? "text" : "password"}
        value={cpassword}
        onChange={(e) => setCPassword(e.target.value)}
        required
      />
    </Box>

    <FormControlLabel control={
            <Switch
            checked={isShown}
            onChange={togglePassword} />} 
        label="Show Passwords"
        />
      

    <Button onClick={handleSubmit} variant="contained">
      Update Profile
    </Button>
</Stack>
  )
}

export default UpdateProfile
