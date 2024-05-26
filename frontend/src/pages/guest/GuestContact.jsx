import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import { getListTeacher } from "../../utils/api/user";

const columns = [
  {
    field: "id",
    headerName: "STT",
    width: 50,
    valueGetter: (params) => {
      return params.value;
    },
  },
  { field: "name", headerName: "Full Name", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  {
    field: "major",
    headerName: "Major",
    width: 150,
    valueGetter: (params) => {
      return params.value?.name;
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    valueGetter: (params) => {
      const value = params?.value == 1 ? "Lecturer" : "Head";
      return value;
    },
  },
];

function GuestContact() {
  const [listTeacher, setListTeacher] = useState([]);
  useEffect(() => {
    const fetchListTeacher = async () => {
      try {
        const res = await getListTeacher();
        setListTeacher(res?.data?.map((e) => ({ id: e._id, ...e })));
      } catch (error) {
        console.log(error);
      }
    };
    fetchListTeacher();
  }, []);
  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Contact Info
      </Button>
      <Box height={300} width={"100%"} mt={4} bgcolor="rgba(255, 255, 255, 0.8)">
        <DataGrid rows={listTeacher} columns={columns} />
      </Box>
    </MainLayout>
  );
}

export default GuestContact;
