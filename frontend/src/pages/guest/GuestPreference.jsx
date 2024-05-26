import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import { list } from "../../utils/api/topic";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    valueGetter: (params) => {
      return params.value;
    },
  },
  {
    field: "student",
    headerName: "Student",
    width: 200,
    valueGetter: (params) => {
      return params.value?.name;
    },
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
    field: "title",
    headerName: "Topic Name",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
];

function GuestPreference() {
  const [listTopic, setListTopic] = useState([]);
  useEffect(() => {
    const getListTopic = async () => {
      try {
        const res = await list({
          student: "notNull",
          teacher: "notNull",
          approveByManagement: 1,
        });
        setListTopic(res?.data?.map((e) => ({ id: e?._id, ...e })));
      } catch (error) {
        console.log(error);
      }
    };
    getListTopic();
  }, []);
  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        References
      </Button>
      <Box height={300} width={"96%"} mt={4}  sx={{
        background: "rgba(255, 255, 255, 0.8)",
        padding: "1rem",
      }}>
        <DataGrid rows={listTopic} columns={columns} />
      </Box>
    </MainLayout>
  );
}

export default GuestPreference;
