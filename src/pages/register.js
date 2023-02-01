import { React, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {HowToReg} from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DarkModeContext } from "@/components/State/DarkModeContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const router = useRouter();

  const { setToast } = useContext(DarkModeContext);

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (values) => {
    const response = await fetch('/api/users/register',{
        method: 'POST',
        body: JSON.stringify(values),
        headers:{
            'Content-Type' : 'application/json'
        }
    });
    const json = await response.json();
    console.log(json);
    setToast(e=>({...e, show: true, message: 'Registration success', severity:'success' }))

}

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .required("Password can not be empty")
      .min(4, "Minimum 4 characters required"),
    confirmPassword: Yup.string()
      .required("Password can not be empty")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <Box sx={{  p: 3 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
              <Box
                my={3}
                display={{ xs: "none", md: "flex" }}
                width={{ xs: "300px", md: "800px" }}
                height={{ xs: "300px", md: "800px" }}
                borderRadius="50%"
                alignItems='center' justifyContent='center'
                overflow="hidden"
                position="relative"
                sx={{opacity:'0.6'}}
              >
                
                <Box position='absolute' zIndex="-1">
                    <Image
                    priority
                    src="/img/signup.png"
                    alt="login"
                    width="800"
                    height="800"
                    />
                </Box>
              
              </Box>

              <Box mb={85} display={{ xs: "flex", sm: "none" }} justifyContent="center">
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>

              <Stack justifyContent="center" mt={-82} zIndex="1" width="80%">

                <Box display="flex" justifyContent='center'>  
                    <Typography variant="h3" gutterBottom>
                        Registration
                    </Typography>
                </Box>

                <Stack my={1}>
                <Field type="text" name="fullName" as={TextField} />
                <ErrorMessage name="fullName" />
                </Stack>

                <Stack my={1}>
                <Field type="email" name="email" as={TextField} />
                <ErrorMessage name="email" />
                </Stack>    

                <Stack my={1}>
                <Field type={showPass?'text':'password'} name="password" as={TextField} />
                <ErrorMessage name="password" />
                </Stack>

                <Stack my={1}>
                <Field type={showPass?'text':'password'} name="confirmPassword" as={TextField} />
                <ErrorMessage name="confirmPassword" />
                </Stack>
              </Stack>

              <Box>
                <FormControlLabel
                  control={<Switch onClick={() => setShowPass((e) => !e)} />}
                  label="Show/Hide Passwords"
                />
              </Box>

              <Stack spacing={2} my={3}>
                <Button variant="contained" type="submit">
                  <HowToReg /> Submit
                </Button>
                <Button variant="text" onClick={() => router.push("/login")}>
                  Already have account? Login here
                </Button>
              </Stack>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

export default Register;
