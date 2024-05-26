import {
  Button,
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import ModalUpdate from "../../components/common/ModalUpdate";
import { list, update } from "../../utils/api/topic";
import { findUser, getListTeacherReview } from "../../utils/api/user";
import { notify } from "../../utils/helpers/notify";

function AssignTeacherReview() {
  const [isOpenModal, setIsOpenMdal] = useState(false);
  const [listTopic, setListTopic] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [listTeacherReview, setListTeacherReview] = useState([]);
  const [teacherReview, setTeacherReview] = useState(null);
  const [currentteacher, setCurrentTeacher] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);

  const [dayReivew, setDayReview] = useState(null);

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "teacher",
      headerName: "Instructor",
      width: 150,
      valueGetter: (params) => {
        return params.value?.name;
      },
    },
    {
      field: "student",
      headerName: "Student",
      width: 150,
      valueGetter: (params) => {
        return params.value?.name;
      },
    },
    {
      field: "",
      width: 150,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setIsOpenMdal(true);
                setCurrentTeacher(params?.row?.teacher?._id);
                setCurrentTopic(params?.row?._id);
              }}
            >
              Assign
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleAssginReivew = async () => {
    try {
      if (!dayReivew) {
        notify("warn", "You have not entered a review date");
      } else if (!teacherReview) {
        notify("warn", "You have not chosen a reviewer yet");
      } else if (teacherReview == currentteacher) {
        notify(
          "warn",
          "Please choose a different reviewer from the instructor"
        );
      } else {
        await update(currentTopic, { teacherReview, dayReivew });
        notify("success", "Assign lecturer review successfully");
        await getListTopic();
        setIsOpenMdal(false);
      }
    } catch (error) {}
  };

  const getListTopic = async () => {
    try {
      const res = await list({
        approveByManagement: 1,
        teacherReview: "null",
        major: currentUser?.major?._id,
        teacher: "notNull",
        student: "notNull",
      });
      setListTopic(res?.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {}
  };

  useEffect(() => {
    const fetchListTeacherReview = async () => {
      try {
        const res = await getListTeacherReview(currentUser?.major?._id);
        setListTeacherReview(
          res?.data?.map((e) => ({ label: e.name, value: e._id }))
        );
      } catch (error) {}
    };
    currentUser?.major?._id && fetchListTeacherReview();
    currentUser && getListTopic();
  }, [currentUser]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const res = await findUser(id);
        setCurrentUser(res.data);
      } catch (error) {}
    };
    getCurrentUser();
  }, []);

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Assign Lecturer Review
      </Button>
      <Box height={300} width={"96%"} mt={4}    sx={{
        background: "rgba(255, 255, 255, 0.8)",
        padding: "1rem",
      }}>
        <DataGrid rows={listTopic} columns={columns} />
      </Box>
      <ModalUpdate
        open={isOpenModal}
        handleClose={() => setIsOpenMdal(false)}
        title={"Assign review board"}
        handleOk={handleAssginReivew}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Lecturer Review:</Typography>
          </Grid>
          <Grid item xs={8}>
            {listTeacherReview && (
              <Autocomplete
                options={listTeacherReview}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
                onChange={(e, value) => setTeacherReview(value.value)}
              />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={2}>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Review Date:</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={dayReivew}
              onChange={(e) => setDayReview(e.target.value)}
            />
          </Grid>
        </Grid>
      </ModalUpdate>
    </MainLayout>
  );
}

export default AssignTeacherReview;
