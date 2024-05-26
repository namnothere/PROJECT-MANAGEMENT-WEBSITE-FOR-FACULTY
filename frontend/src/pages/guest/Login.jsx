import React, { useState,useEffect, useCallback } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { login } from "../../utils/api/user";
import { notify } from "../../utils/helpers/notify";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
      }));
    },
    [setCredentials]
  );

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await login(credentials); // Send credentials to login function
      localStorage.setItem("user", JSON.stringify(res?.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {

    window.onGoogleSuccess = async (response) => {
      
      window.location.href = 'http://localhost:8080/auth/google';
      //history.push('/app/homepage');
      console.log(response);
    };

    // Inject the google provided script 
    // (an importable module would be nicer here)
    // const script = document.createElement('script');
    // script.src = "https://accounts.google.com/gsi/client";
    // script.async = true;
    // document.body.appendChild(script);

    return () => {
      // clean up for react lifecycle
      window.onGoogleSuccess = undefined;
      //document.body.removeChild(script)
    }
  }, []);
  const handleGoogleLoginClick = () => {
    console.log("handleGoogleLoginClick")
    // Trigger Google login when the button is clicked   
    if (window.onGoogleSuccess) {
      window.onGoogleSuccess();
    }
  };

  return (
    <MainLayout>
      <Box display={"flex"} justifyContent={"center"}>
        <Paper elevation={3}>
          <Box minWidth={"20vw"} padding={2}>
            <Typography textAlign={"center"} variant="h5" fontWeight={"bold"}>
              Login
            </Typography>
            <Stack gap={2} mt={4} component={"form"} onSubmit={handleLogin}>
              <TextField
                fullWidth
                size="small"
                label="Username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
              <Button fullWidth size="medium" variant="contained" type="submit" onClick={handleLogin}>
                Login
              </Button>
              <Button className="mt-6" block layout="outline" onClick={handleGoogleLoginClick}>
                <GoogleIcon className="w-6 h-6 mr-2" aria-hidden="true"  />
                Google
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}
export default Login;
