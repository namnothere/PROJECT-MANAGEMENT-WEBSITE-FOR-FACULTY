import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";

function StatusTopic() {
  return (
    <MainLayout type={"student"}>
      <Button fullWidth size="large" variant="contained">
        Topic Status
      </Button>
      <Box mt={4}>
        <Button variant="contained">Topic awaiting approval for registration</Button>
        <Paper elevation={3}>
          <Box p={4}>
            <Typography fontWeight={"bold"}>
              STATUS REGULATIONS
            </Typography>
            <Box p={2}>
              <Typography variant="subtitle2" fontWeight={"medium"}>
                1. Not registered for topic: Account has not registered for scientific research topic
              </Typography>
              <Typography variant="subtitle2" fontWeight={"medium"} mt={2}>
                2. Waiting for approval: The topic is waiting for approval to be implemented
              </Typography>
              <Typography variant="subtitle2" fontWeight={"medium"} mt={2}>
                3. Approved for implementation: The project has been approved and signed a contract with the Department of Science and Technology
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default StatusTopic;
