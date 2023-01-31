import { Button, CircularProgress, Paper, Stack } from "@mui/material"
import { Box } from "@mui/system";
import { UserProfileChangeAvatar } from "APIs/UserProfileAPI";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { DarkModeContext } from "../State/DarkModeContext";
import { UserContext } from "../State/UserContext";

const UpdateAvatar = () => {

  const refAvatar = useRef(null);

  const { user, setUser } = useContext(UserContext);
  const {setToast} = useContext(DarkModeContext)

	const [isSending, setIsSending] = useState(false)



    //picture clicked to call File click event
    const handlePicClick = () => {
        refAvatar?.current.click();
      };
    
      //function to change profile picture
      const handleChange = async (e) => {
        setIsSending(true)
        const files = document.getElementById("avatar");
        
        if (files.files.length===0) {
          setToast(e=>({...e, show: true, message:'cancelled by user', severity:'info'}))
          return;
        }
        setTimeout(() => {
            setUser({ ...user, profile_pic: `/avatar/${user._id}.png?v=${Math.random()}` });
            setIsSending(false)
        }, 1500);
        const formData = new FormData();
        formData.append("avatar", files.files[0]);
    

        UserProfileChangeAvatar(user, formData)
          .then((response) => {
            setToast(e=>({...e, show: true, message: 'New Avatar updated', severity:'success'}))
          })
          .catch((error) => setToast(e=>({...e, show: true, message: 'Unable to process your request', severity:'error'})));
      };


  return (
    <Stack>
      {isSending ? <CircularProgress /> : (
        <>
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
        </>
      )}
    </Stack>
  )
}

export default UpdateAvatar
