import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteTopicByManagement,
  findTopic,
  list,
  update,
} from "../../utils/api/topic";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import ModalUpdate from "../../components/common/ModalUpdate";
import { notify } from "../../utils/helpers/notify";

function AdminHome() {
  const [listTopic, setListTopic] = useState([]);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

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
    { field: "title", headerName: "Topic name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "approveByManagement",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const text =
          params.row.approveByManagement === 0
            ? "Not approved"
            : "Approved";
        const color = params.row.approveByManagement === 0 ? "#f44336" : "#4caf50";
        return (
          <span style={{ color }}>{text}</span>
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
      await deleteTopicByManagement(idDelete);
      notify("success", "Delete topic successfully");
      setIsOpenConfirmDelete(false);
      setListTopic(listTopic?.filter((e) => e._id !== idDelete));
    } catch (error) {
      throw error;
    }
  };

  const getListTopic = async () => {
    try {
      const res = await list();
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
    getListTopic();
  }, []);

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

  return (
    <MainLayout type="teacher">
      <Button fullWidth size="large" variant="contained">
        Manage Topic
      </Button>
      <Box height={"40vh"} width={"96%"} mt={4}    sx={{
        background: "rgba(255, 255, 255, 0.8)",
        padding: "1rem",
      }}>
        <DataGrid rows={listTopic} columns={columns} hideFooter={true} />
      </Box>
      <ConfirmDelete
        title={"Delete Topic"}
        content={"Are you sure you want to delete this topic?"}
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
              label="Topic name"
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
              Students perform:{" "}
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
                : "Not approved"}
            </Typography>
          </Grid>
        </Grid>
      </ModalUpdate>
    </MainLayout>
  );
}

export default AdminHome;
