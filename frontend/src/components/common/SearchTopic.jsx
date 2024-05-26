import React from "react";
import { Button, Box, TextField, Grid } from "@mui/material";

function SearchTopic() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4.5}>
        <TextField fullWidth size="small" placeholder="Enter the topic code" />
      </Grid>
      <Grid item xs={4.5}>
        <TextField fullWidth size="small" placeholder="Enter the topic name" />
      </Grid>
      <Grid item xs={3}>
        <Box display={"flex"} gap={1} justifyContent={"center"}>
          <Button variant="outlined" color="error" fullWidth>
            Clear
          </Button>
          <Button variant="contained" fullWidth>
            Find
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchTopic;
