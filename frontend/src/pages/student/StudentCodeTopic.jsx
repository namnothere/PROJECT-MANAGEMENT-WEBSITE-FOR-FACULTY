import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import { Button, Box, Grid, Paper, Typography } from "@mui/material";

function StudentCodeTopic() {
  return (
    <MainLayout type={"student"}>
      <Button fullWidth size="large" variant="contained">
        Topic ID
      </Button>
      <Box mt={4}>
        <Button variant="contained">Topic ID has not been provided yet</Button>
        <Paper elevation={2}>
          <Box p={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Full Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">
                      Tăng Tâm Như
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Faculty:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">High Quality Faculty</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Topic Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">Topic 1</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Reason:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2"></Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">ID:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">CT160585</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Class:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">CLCIT</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default StudentCodeTopic;
