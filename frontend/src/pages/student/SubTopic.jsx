import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import { findUser } from "../../utils/api/user";
import { findTopicOfStudent, list, update } from "../../utils/api/topic";
import { notify } from "../../utils/helpers/notify";
import { findPeriodByMajor } from "../../utils/api/period";
import moment from "moment";

function SubTopic() {
  const [currentUser, setCurrentUser] = useState({});
  const [listTopic, setListTopic] = useState([]);
  const [currentTopic, setCurrentTopic] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [text, setText] = useState("");

  const columns = [
    {
      field: "id",
      headerName: "ID",

      valueGetter: (params) => {
        return params.value;
      },
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "teacher",
      headerName: "Instructor",
      width: 200,
      valueGetter: (params) => {
        return params.value?.name;
      },
    },
    {
      field: "",
      width: 100,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleSubTopic(params.row.id)}
            >
              Register
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleSubTopic = async (id) => {
    try {
      if (currentTopic) {
        notify(
          "info",
          "You have registered for the topic, select manage topic to view details"
        );
      } else {
        await update(id, { student: currentUser?._id });
        notify("success", "Update successfully");
        await getListTopic();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getListTopic = async () => {
    try {
      const res = await list({
        major: currentUser?.major?._id,
        approveByManagement: 1,
        student: undefined,
        teacher: "notNull",
      });
      setListTopic(res.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {}
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
    const getCurrentTopic = async () => {
      try {
        const res = await findTopicOfStudent(currentUser?._id);
        setCurrentTopic(res.data);
      } catch (error) {}
    };
    currentUser && getCurrentTopic();
    currentUser && getListTopic();
  }, [currentUser]);

  useEffect(() => {
    const getPeriod = async () => {
      try {
        const res = await findPeriodByMajor(currentUser?.major?._id);
        setCurrentPeriod(res.data);
      } catch (error) {}
    };
    currentUser && getPeriod();
  }, [currentUser]);

  useEffect(() => {
    const getStatus = () => {
      const today = moment();
      const timeOpen = moment(currentPeriod?.timeOpen, "DD/MM/YYYY");
      const timeClose = moment(currentPeriod?.timeClose, "DD/MM/YYYY");

      console.log({ today, timeOpen });

      if (today.isBefore(timeOpen)) {
        setText("It's not time to register yet. Please come back later!");
      }

      if (today.isAfter(timeClose)) {
        setText(
          "The time for registration has expired. Please contact your instructor for help!"
        );
      }
    };
    currentPeriod?.timeOpen && getStatus();
  }, [currentPeriod]);

  return (
    <MainLayout type="student">
      <Button fullWidth size="large" variant="contained">
        Register Topic
      </Button>

      {!currentUser?.major ? (
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
          <Button variant="contained" size="small" href="/student-info">
            Update
          </Button>
        </Box>
      ) : currentPeriod ? (
        text ? (
          <>
            <Typography variant="subtitle2" mt={4}>
              {text}
            </Typography>
            <Typography variant="subtitle2" mt={2}>
              Topic registration time: {currentPeriod.timeOpen} -{" "}
              {currentPeriod.timeClose}
            </Typography>
          </>
        ) : (
          <>
            <Box height={300} width={"96%"} mt={4}  sx={{
              background: "rgba(255, 255, 255, 0.8)",
              padding: "1rem",
            }}>
              <DataGrid rows={listTopic} columns={columns} hideFooter={true} />
            </Box>
          </>
        )
      ) : (
        <>
          <Typography variant="subtitle2" mt={2}>
            There is no date to register yet.
          </Typography>
        </>
      )}
    </MainLayout>
  );
}

export default SubTopic;
