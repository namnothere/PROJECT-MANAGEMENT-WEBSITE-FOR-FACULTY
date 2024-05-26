import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

function TableUserInfomation({ user, handleUpdate }) {
  return (
    <React.Fragment>
    <Paper elevation={2} sx={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
      <Box p={4}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Full Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.name}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Username:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.username}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Email:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.email}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Major:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.major?.name}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Birthday:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.birth}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">ID:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?._id}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Phone:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.phone}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Sex:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">
                  {user?.sex > 0 ? "Nam" : "Nữ"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Address:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.address}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Box>
    </Paper>

    <Box mt={4} textAlign={"center"}>
      <Button variant="contained" onClick={handleUpdate}>
        Update
      </Button>
    </Box>
  </React.Fragment>
  );
}

export default TableUserInfomation;
