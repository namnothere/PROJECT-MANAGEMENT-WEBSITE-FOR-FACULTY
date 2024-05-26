import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { findUser } from "../../utils/api/user";
import { list, update } from "../../utils/api/topic";
import { notify } from "../../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";

function TeacherSelectTopic() {
  const [currentUser, setCurrentUser] = useState({});
  const [listTopic, setListTopic] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "Topic ID",
      width: 200,
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 300 },

    {
      field: "",

      width: 150,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleSelectTopic(params.row._id)}
            >
              Register
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleSelectTopic = async (id) => {
    try {
      await update(id, { teacher: currentUser?._id });
      notify("success", "Choose topic successfully");
      getListTopic();
    } catch (error) {
      console.log(error);
    }
  };

  const getListTopic = async () => {
    try {
      const res = await list({
        major: currentUser?.major?._id,
        approveByManagement: 1,
        teacher: undefined,
      });
      setListTopic(res?.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const res = await findUser(id);
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    currentUser && getListTopic();
  }, [currentUser]);

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Choose Topic
      </Button>
      {currentUser?.major ? (
        <Box height={"40vh"} 
        width={"96%"} 
        mt={4} 
        sx={{
          background: "rgba(255, 255, 255, 0.8)", // Màu nền trắng có độ trong suốt
          padding: "1rem", // Thêm padding cho khung
        }}>
          <DataGrid rows={listTopic} columns={columns} hideFooter={true} />
        </Box>
      ) : (
        <Box
          mt={4}
          display={"flex"}
          alignItems={"center"}
          gap={2}
          justifyContent={"center"}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="subtitle2">
            You must update your major information before registering for a topic
          </Typography>
          <Button variant="contained" size="small" href="/teacher-info">
            Update
          </Button>
        </Box>
      )}
    </MainLayout>
  );
}

export default TeacherSelectTopic;
