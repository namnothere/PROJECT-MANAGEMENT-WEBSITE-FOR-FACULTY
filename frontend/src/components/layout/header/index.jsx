import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png"; 
import { Box, Button, Typography, ListItemIcon, styled } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 

const Text = styled(Typography)({
  color: "black",
  textTransform: "uppercase",
  padding: "12px 10px",
  fontSize: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  "&:hover": {
    color: "#88cafd",
  },
});
const WhiteBox = styled(Box)({
  background: "white",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
});

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const getCurrentUser = () => {
      const obj = localStorage.getItem("user");
      if (obj) {
        setUser(JSON.parse(obj));
      }
    };
    getCurrentUser();
  }, []);

  return (
    <WhiteBox
      width={"100%"}
      bgcolor={"white"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"}>
        <img src={logo}alt="Logo" style={{ marginRight: '2px', width: '80px', height: '50px' }} />
        <Text sx={{ fontSize: '17px' }}>WELCOME TO BE A MEMBER OF HCM CITY UNIVERSITY OF TECHNOLOGY AND EDUCATION</Text>
      </Box>
      {!user?.email ? (
        <Button size="small" href="/login" >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <PersonIcon sx={{ color: "black" }} />
            <Typography color={"black"} fontSize={12} fontWeight={"bold"}>
              LOG IN
            </Typography>
          </Box>
        </Button>
      ) : (
        <Box display={"flex"} alignItems={"center"}>

           <AccountCircleIcon /> 
          <Text>{user?.email}</Text>
          <Button onClick={handleLogout}>
            <Typography fontSize={12} color={"black"} fontWeight={"bold"}>
              LOG OUT
            </Typography>
          </Button>
        </Box>
      )}
    </WhiteBox>
  );
}

export default Header;
