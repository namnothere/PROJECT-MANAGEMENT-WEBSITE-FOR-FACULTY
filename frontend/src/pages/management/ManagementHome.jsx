import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteTopic,
  deleteTopicByManagement,
  findTopic,
  list,
  update,
} from "../../utils/api/topic";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import ModalUpdate from "../../components/common/ModalUpdate";
import { notify } from "../../utils/helpers/notify";
import { findUser } from "../../utils/api/user";

function ManagementHome() {
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
      headerName: "ID",
      width: 150,
    },
    { field: "title", headerName: "Title", width: 150 },
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
          </span> );
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
      await deleteTopicByManagement(idDelete);
      notify("success", "Delete account successfully");
      setIsOpenConfirmDelete(false);
      setListTopic(listTopic?.filter((e) => e._id !== idDelete));
    } catch (error) {
      throw error;
    }
  };

  const getListTopic = async () => {
    try {
      const res = await list({
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
        console.log(res.data, "resss");
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
      <Box height={"40vh"} width={"96%"} mt={4} sx={{
        background: "rgba(255, 255, 255, 0.8)",
        padding: "1rem",
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
        title={"Details Box"}
      >
        <Grid container spacing={2} py={2}>
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

          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Major: {infoTopicUpdate?.major?.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Instructor:{" "}
              {infoTopicUpdate?.teacher
                ? infoTopicUpdate?.teacher?.name
                : "Nothing"}
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
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Lecturer Review:{" "}
              {infoTopicUpdate?.teacherReview
                ? infoTopicUpdate?.teacherReview?.name
                : "Nothing"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
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

export default ManagementHome;
