import { Button, Box, styled } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import ConfirmDelete from "../../components/common/ConfirmDelete";

const rows = [
  {
    id: 1,
    teacher: "Ronaldo",
    title: "Topic 1",
    date: "13/11/2023",
  },
  {
    id: 2,
    teacher: "Messi",
    title: "Topic 2",
    date: "13/11/2023",
  },
];

const ConfirmApprove = styled(ConfirmDelete)({});

function ApproveSubTopic() {
  const [isOpenModal, setIsOpenMdal] = useState(false);
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
    { field: "teacher", headerName: "Instructor", width: 150 },
    { field: "date", headerName: "Registration Date", width: 150 },
    {
      field: "",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => setIsOpenMdal(true)}
            >
              Confirm
            </Button>
            <Button variant="contained" size="small">
              Details
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <MainLayout type="teacher">
      <Button fullWidth size="large" variant="contained">
        Approve Topic Registration
      </Button>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <ConfirmApprove
        open={isOpenModal}
        title={"Confirm Box"}
        content={"Are you sure you approve this topic?"}
        handleClose={() => setIsOpenMdal(false)}
      />
    </MainLayout>
  );
}

export default ApproveSubTopic;
