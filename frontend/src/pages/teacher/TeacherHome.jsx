import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import { deleteTopic, findTopic, list, update } from "../../utils/api/topic";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import ModalUpdate from "../../components/common/ModalUpdate";
import { notify } from "../../utils/helpers/notify";
import { findUser } from "../../utils/api/user";

const StatusLabel = ({ status }) => {
  const colorText = status === 0 ? "red" : "green";
  const label = status === 0 ? "Chưa được phê duyệt" : "Đã được phê duyệt";
  return <span style={{ color: colorText }}>{label}</span>;
};

const UserInfo = ({ label, value }) => {
  return (
    <Grid item xs={6}>
      <Typography variant="subtitle2">
        {label}: {value || "Không có"}
      </Typography>
    </Grid>
  );
};

function TeacherHome() {
  const [listTopic, setListTopic] = useState([]);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [infoTopicUpdate, setInfoTopicUpdate] = useState({});

  const columns = [
    {
      field: "id",
      headerName: "Topic ID",
      width: 150,
    },
    { field: "title", headerName: "Topic Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "approveByManagement",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const label = params.row.approveByManagement === 0 ? 'Not Approved' : 'Approved';
        const colorText = params.row.approveByManagement === 0 ? 'red' : 'green';

        return (
          <span style={{ color: colorText }}>
            {label}
          </span>
        );
      },
    },
    {
      field: "",
      width: 250,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setIsOpenModalUpdate(true);
                setIdUpdate(params.row._id);
              }}
            >
              Details
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => {
                setIsOpenConfirmDelete(true);
                setIdDelete(params.row._id);
              }}
            >
              Delete Topic
            </Button>
          </Box>
        );
      },
    },
  ];


  const handleDelete = async () => {
    try {
      await deleteTopic(idDelete);
      notify("success", "Delete successfully");
      setIsOpenConfirmDelete(false);
      setListTopic(listTopic?.filter((e) => e._id !== idDelete));
    } catch (error) {
      console.error(error);
    }
  };

  const getListTopic = async () => {
    try {
      const res = await list({
        teacher: currentUser?._id,
        major: currentUser?.major?._id,
      });
      setListTopic(res.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await update(idUpdate, { title, description });
      notify("success", "Update topic successfully");
      setIsOpenModalUpdate(false);
      getListTopic();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentUser && getListTopic();
  }, [currentUser]);

  useEffect(() => {
    const getTopicById = async () => {
      try {
        const res = await findTopic(idUpdate);
        setInfoTopicUpdate(res.data);
        setTitle(res?.data?.title);
        setDescription(res?.data?.description);
      } catch (error) {
        console.log(error);
      }
    };
    idUpdate && getTopicById();
  }, [idUpdate]);

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

  return (
    <MainLayout type="teacher">
      <Button fullWidth size="large" variant="contained">
        Manage Topic
      </Button>
      <Box
        height={"40vh"}
        width={"96%"}
        mt={4}
        sx={{
          background: "rgba(255, 255, 255, 0.8)", // Màu nền trắng có độ trong suốt
          padding: "1rem", // Thêm padding cho khung
        }}>     
        <DataGrid rows={listTopic} columns={columns} hideFooter={true} />
      </Box>
      <ConfirmDelete
        title={"Delete Topic"}
        content={"Are you sure to delete this topic?"}
        open={isOpenConfirmDelete}
        handleOk={handleDelete}
        handleClose={() => setIsOpenConfirmDelete(false)}
      />

      <ModalUpdate
        open={isOpenModalUpdate}
        handleClose={() => setIsOpenModalUpdate(false)}
        handleOk={handleUpdate}
        title={
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Details Box
          </Typography>
        }
      >
        <Box p={2}>
          <Typography variant="subtitle2" color={"error"}>
            *Note: You can only update topics you create
          </Typography>
        </Box>
        <Grid container spacing={2} py={2}>
          {infoTopicUpdate?.owner === currentUser?._id ? (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Topic Name"
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  size="small"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={5}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Topic Name: {infoTopicUpdate?.title}
                </Typography>
                <Typography variant="subtitle2">
                  Description: {infoTopicUpdate?.description}
                </Typography>
              </Grid>
            </>
          )}
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Major: {infoTopicUpdate?.major?.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
                Student:{" "}
              {infoTopicUpdate?.student
                ? infoTopicUpdate?.student?.name
                : "Nothing"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Status:{" "}
              {infoTopicUpdate?.approveByManagement === 1
                ? "Approved"
                : "Not Approved"}
            </Typography>
          </Grid>
        </Grid>
      </ModalUpdate>

    </MainLayout>
  );
}

export default TeacherHome;
