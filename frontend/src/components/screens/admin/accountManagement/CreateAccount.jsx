import { Box, Button, Grid, TextField, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { create } from "../../../../utils/api/user";
import { notify } from "../../../../utils/helpers/notify";
import SelectMajor from "../../../common/SelectMajor";


function CreateAccount({ setList }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [major, setMajor] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const handleReset = () => {
    setName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole(0);
    setMajor(0);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleCreateUser = async (e) => {
    try {
      e.preventDefault();
      const res = await create({
        name,
        username,
        password,
        email,
        role,
        major,
      });
      notify("success", "Add account successfully");
      setList((prev) => [{ ...res?.data, id: res?.data?._id }, ...prev]);
      handleReset();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };


  return (
    <Box  mt={4}>
    <Button fullWidth size="large" variant="contained">
        Manage Account
      </Button>
      <Box
        mt={2}
        p={2}
        component={"form"}
        onSubmit={handleCreateUser}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px', // Tạo khoảng cách với nút bên dưới
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"

              label={isNameFocused ? "Fullname" : ""}
              value={name}
              onChange={handleNameChange}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
              required
              InputProps={{
                style: {
                  color: isNameFocused ? "black" : "transparent",
                  transition: "color 0.3s ease",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label={isUsernameFocused ? "Username" : ""}
                value={username}
                onChange={handleUsernameChange}
                onFocus={() => setIsUsernameFocused(true)}
                onBlur={() => setIsUsernameFocused(false)}
                required
                InputProps={{
                  style: {
                    color: isUsernameFocused ? "black" : "transparent",
                    transition: "color 0.3s ease",
                  },
                }}
              />
          </Grid>
          <Grid item xs={6}>
            <Box position="relative">
              <TextField
                fullWidth
                size="small"
                label={isFocused ? "Password" : ""}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
                InputProps={{
                  style: {
                    color: isFocused ? "black" : "transparent",
                    transition: "color 0.3s ease",
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box position="relative">
              <TextField
                fullWidth
                size="small"
                label={isEmailFocused ? "Email" : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                required
                InputProps={{
                  style: {
                    color: isEmailFocused ? "black" : "transparent",
                    transition: "color 0.3s ease",
                  },
                }}
              />
            </Box>
          </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                size="small"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={0}>Student</MenuItem>
                <MenuItem value={1}>Teacher</MenuItem>
                <MenuItem value={2}>Department Head</MenuItem>
                <MenuItem value={3}>Admin</MenuItem>

              </Select>
            </Grid>
            
            <Grid item xs={6}>
              <SelectMajor value={ major} setValue={setMajor} />
            </Grid>     
         </Grid>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          mt={2}
        >
          <Button variant="contained" type="submit" onClick={handleCreateUser}>
            Add account
          </Button>
        </Box>
  </Box>
  
  );
}

export default CreateAccount;
