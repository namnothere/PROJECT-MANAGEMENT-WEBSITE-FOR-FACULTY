import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { findUser } from "../../utils/api/user";
import { create } from "../../utils/api/topic";
import { notify } from "../../utils/helpers/notify";
function TeacherSubTopic() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  const handleSubmitTopic = async (e) => {
    try {
      e.preventDefault();
      await create({
        title: topicTitle,
        description: topicDescription,
        teacher: loggedInUser?._id,
        major: loggedInUser?.major?._id,
        owner: loggedInUser?._id,
      });
      notify("success", "Add topic successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const response = await  findUser(id);
        setLoggedInUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Register Topic
      </Button>
      {loggedInUser?.major ? (
        <Box mt={4}>
          <Box
            p={4}
            component={"form"}
            sx={{
              background: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography variant="subtitle2">Topic Title:</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={2}>
                <Typography variant="subtitle2">Topic Description:</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  value={topicDescription}
                  onChange={(e) => setTopicDescription(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
          <Box display={"flex"} justifyContent={"center"} gap={2} mt={2}>
            <Button variant="contained" type="submit" onClick={handleSubmitTopic}>
              Register
            </Button>
          </Box>
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

export default TeacherSubTopic;
