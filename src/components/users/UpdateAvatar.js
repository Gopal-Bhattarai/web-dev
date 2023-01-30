import { Button, Paper, Stack } from "@mui/material"
import { Box } from "@mui/system";
import { UserProfileChangeAvatar } from "APIs/UserProfileAPI";
import Image from "next/image";
import { useContext, useRef } from "react";
import { UserContext } from "../State/UserContext";

const UpdateAvatar = () => {

  const refAvatar = useRef(null);

  const { user, setUser } = useContext(UserContext);


    //picture clicked to call File click event
    const handlePicClick = () => {
        refAvatar?.current.click();
      };
    
      //function to change profile picture
      const handleChange = async (e) => {
        const files = document.getElementById("avatar");
        if (files.files.length===0) {
          console.log("no files selected, cancelled");
          return;
        }
        // notify({id: 'load-data', title: 'Processing...', message: 'Please be patience while we save your changes...', autoClose: false, disallowClose: true, loading: true })
        setTimeout(() => {
            setUser({ ...user, profile_pic: `/avatar/${user._id}.png?v=${Math.random()}` });
            console.log(user);
        }, 1500);
        const formData = new FormData();
        formData.append("avatar", files.files[0]);
    

        UserProfileChangeAvatar(user, formData)
          .then((response) => {
            // updateChange(response.data.user)
            // updateNotify({id: 'load-data', title: 'Success', message: response.data.status , icon: <IconCheck size={20} /> })
            //console.log(response.data)
          })
          .catch((error) => console.log(error));
      };


  return (
    <Stack>
        <Button variant="contained">
          Pick Profile Picture
          <input hidden type="file"
          id="avatar"
          name="avatar"
          ref={refAvatar}
          accept="image/png, image/gif, image/jpeg"
          onChange={handleChange} />
        </Button>
        
        {user && user.profile_pic && (
          <Paper elevation={5}>
            <Image
              priority
              width={250}
              height={250}
              src={user.profile_pic}
              caption="Click to change"
              alt="user"
              radius="md"
              onClick={handlePicClick}
            />
          </Paper>
        )}
    </Stack>
  )
}

export default UpdateAvatar
