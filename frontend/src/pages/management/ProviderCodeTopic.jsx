import React, { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { Button, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ModalUpdate from "../../components/common/ModalUpdate";
import SearchTopic from "../../components/common/SearchTopic";

const rows = [
  {
    id: 1,
    teacher: "test 1",
    code: "123",
    title: "Topic 1",
    date: "09/10/2023",
  },
  {
    id: 2,
    teacher: "Test 2",
    code: "122",
    title: "Topic 2",
    date: "11/10/2023",
  },
];

function ManagementApproveSubTopic() {
  const [isOpenModal, setIsOpenMdal] = useState(false);
  const [value, setValue] = useState("");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      valueGetter: (params) => {
        return params.value;
      },
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "teacher", headerName: "Intructor", width: 150 },
    { field: "code", headerName: "ID Student", width: 150 },
    { field: "date", headerName: "Registration Date", width: 150 },
    {
      field: "",
      width: 150,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => {
                setIsOpenMdal(true);
                setValue(Math.floor(Math.random() * 1000000));
              }}
            >
              Confirm
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
      Provide Topic ID 
      </Button>
      <Box mt={4}>
        <SearchTopic />
      </Box>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <ModalUpdate
        open={isOpenModal}
        title={"Provide Topic ID"}
        handleClose={() => setIsOpenMdal(false)}
      >
        <TextField fullWidth value={value} />
      </ModalUpdate>
    </MainLayout>
  );
}

export default ManagementApproveSubTopic;
