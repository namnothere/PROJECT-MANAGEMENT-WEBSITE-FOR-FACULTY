import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SelectMajor from "../../components/common/SelectMajor";
import { create, deletePeriod, list } from "../../utils/api/period";
import { DataGrid } from "@mui/x-data-grid";
import { notify } from "../../utils/helpers/notify";
import ConfirmDelete from "../../components/common/ConfirmDelete";

function PeriodManagement() {
  const [formData, setFormData] = useState({
    timeOpen: "",
    timeClose: "",
    major: "",
  });

  const [listPeriod, setListPeriod] = useState([]);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const columns = [
    {
      field: "major",
      headerName: "Name of major",
      width: 200,
      valueGetter: (params) => params.value?.name,
    },
    { field: "timeOpen", headerName: "Open time", width: 200 },
    { field: "timeClose", headerName: "Close time", width: 200 },
    {
      field: "",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap={2} alignItems="center">
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              setIsOpenConfirmDelete(true);
              setIdDelete(params.row._id);
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const getListPeriod = async () => {
    try {
      const res = await list();
      setListPeriod(res.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      await deletePeriod(idDelete);
      notify("success", "Delete successfully");
      setIsOpenConfirmDelete(false);
      getListPeriod();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePeriod = async (e) => {
    e.preventDefault();
    try {
      await create(formData);
      getListPeriod();
      notify("success", "Create successfully");
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
    handleClear();
  };

  const handleClear = () => {
    setFormData({ timeOpen: "", timeClose: "", major: "" });
  };

  useEffect(() => {
    getListPeriod();
  }, []);

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Manage topic Registration Time
      </Button>

      <Box
        height="30vh"
        width="100%"
        mt={4}
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <DataGrid rows={listPeriod} columns={columns} hideFooter={true} />
      </Box>

      <ConfirmDelete
        open={isOpenConfirmDelete}
        handleOk={handleDelete}
        handleClose={() => setIsOpenConfirmDelete(false)}
      />

      <Box
        mt={5}
        component="form"
        onSubmit={handleCreatePeriod}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              marginBottom: "20px",
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            Time period to complete the project
          </Typography>
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="Open time"
              placeholder="DD/MM/YYYY"
              required
              value={formData.timeOpen}
              onChange={(e) =>
                setFormData({ ...formData, timeOpen: e.target.value })
              }
              sx={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="Close time"
              placeholder="DD/MM/YYYY"
              required
              value={formData.timeClose}
              onChange={(e) =>
                setFormData({ ...formData, timeClose: e.target.value })
              }
              sx={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectMajor
              value={formData.major}
              setValue={(value) =>
                setFormData({ ...formData, major: value })
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" type="submit" onClick={handleCreatePeriod}>
          Create New
        </Button>
      </Box>
    </MainLayout>
  );
}

export default PeriodManagement;
