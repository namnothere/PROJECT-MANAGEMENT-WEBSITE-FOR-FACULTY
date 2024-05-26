import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { findUser } from "../../utils/api/user";
import { create } from "../../utils/api/topic";
import { notify } from "../../utils/helpers/notify";

function ManagementSubTopic() {
  const [currentUser, setCurrentUser] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTopic = async (e) => {
    try {
      e.preventDefault();
      await create({
        title,
        description,
        approveByManagement: 1,
        major: currentUser?.major?._id,
        owner: currentUser?._id,
      });
      notify("success", "Add topic successfully");
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

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Register Topic
      </Button>
      {currentUser?.major ? (
        <Box p={4} component={"form"} onSubmit={handleCreateTopic}   mt={4} sx={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "1rem",
        }}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography variant="subtitle2">Topic Name:</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={1}>
            <Grid item xs={2}>
              <Typography variant="subtitle2">Description:</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                multiline
                rows={3}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>

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
          <Button variant="contained" size="small" onDoubleClick={handleCreateTopic}>
            Update
          </Button>
        </Box>
      )}
      
      <Box display={"flex"} justifyContent={"center"} gap={2} mt={2}>
      <Button variant="contained" type="submit" onClick={handleCreateTopic}>
        Register
      </Button>
    </Box>
    </MainLayout>
  );
}

export default ManagementSubTopic;
