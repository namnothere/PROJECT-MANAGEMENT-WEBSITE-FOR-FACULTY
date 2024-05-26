import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar/index";
import {
  managementSideBar,
  studentSideBar,
  teacherSideBar,
  adminSideBar,
  guestSideBar,
} from "../../contstant/sidebar";
import Footer from "./footer";
import backgroundImage from '../../assets/img/bg.jpg';

function MainLayout({ children }) {
  const containerWrapperStyles = {
    backgroundImage: `url(${backgroundImage})`, // Đường dẫn tương đối đến hình ảnh của bạn
    backgroundSize: "cover", 
    minHeight: "100vh",
  };

  const [listSidebar, setListSidebar] = useState([]);
  useEffect(() => {
    const getListSidebar = () => {
      const obj = localStorage.getItem("user");
      const type = JSON?.parse(obj)?.role;
      switch (type) {
        case 3:
          setListSidebar(adminSideBar);
          break;
        case 2:
          setListSidebar(managementSideBar);
          break;
        case 1:
          setListSidebar(teacherSideBar);
          break;
        case 0:
          setListSidebar(studentSideBar);
          break;
        default:
          setListSidebar(guestSideBar);
          break;
      }
    };
    getListSidebar();
  }, []);
  return (
    <div className="container-wrapper" style={containerWrapperStyles}>
      <Container>
        <Header />
        <Box py={4}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <Sidebar listSidebar={listSidebar} />
            </Grid>
            <Grid item xs={9}>
              {children}
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Container>
    </div>
  );
}

export default MainLayout;
