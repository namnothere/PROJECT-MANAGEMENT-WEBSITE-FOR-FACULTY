import {
  Button,
  Box,
  styled,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import ModalUpdate from "../../components/common/ModalUpdate";
import SearchTopic from "../../components/common/SearchTopic";

const rows = [
  {
    id: "02231",
    teacher: "test 2",
    title: "Topic 1",
    date: "18/10/2023",
  },
  {
    id: "1322",
    teacher: "test3",
    title: "Topic 2",
    date: "22/09/2023",
  },
];

const ModalReview = styled(ModalUpdate)({});

function ListReview() {
  const [isOpenModal, setIsOpenMdal] = useState(false);
  const columns = [
    {
      field: "id",
      headerName: "Topic ID",
      width: 150,
      valueGetter: (params) => {
        return params.value;
      },
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "date", headerName: "Review Date", width: 150 },
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
              onClick={() => setIsOpenMdal(true)}
            >
              See reviews
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <MainLayout type="teacher">
      <Button fullWidth size="large" variant="contained">
        See reviews
      </Button>
      <Box mt={4}>
        <SearchTopic />
      </Box>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <ModalReview
        open={isOpenModal}
        handleOk={() => setIsOpenMdal(false)}
        title={"Comment the Review"}
        showCancel={false}
        titleOk={"Close"}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="subtitle2" mb={2}>
              Review's Content:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle2" mb={2}>
              Very good
            </Typography>
          </Grid>
        </Grid>
      </ModalReview>
    </MainLayout>
  );
}

export default ListReview;
