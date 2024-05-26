import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { create, list, update } from "../../utils/api/major";
import { notify } from "../../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import ModalUpdate from "../../components/common/ModalUpdate";

function MajorManagement() {
  const [name, setName] = useState("");
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [listMajor, setListMajor] = useState([]);
  const [majorUpdate, setMajorUpdate] = useState({});

  const columns = [
    {
      field: "id",
      headerName: "ID Major",
      width: 150,
    },
    { field: "name", headerName: "Name of Major", width: 300 },
    {
      field: "isBlock",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const label = params.row.isBlock > 0 ? "Open" : "Close";
        const textColor = params.row.isBlock > 0 ? "green" : "red";

        return <span style={{ color: textColor }}>{label}</span>;
      },
    },
    {
      field: "",
      width: 250,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setIsOpenModalUpdate(true);
                setMajorUpdate(listMajor?.find((i) => i.id == params.row.id));
              }}
            >
              Update
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleCreateMajor = async (e) => {
    try {
      e.preventDefault();
      const res = await create({ name });
      setName("");
      setListMajor((prev) => [{ ...res?.data, id: res?.data?._id }, ...prev]);
      notify("success", "Add major successfully");
    } catch (error) {
      console.log(error);
      notify("error", error?.response?.data?.message);
    }
  };

  const handleUpdateMajor = async () => {
    try {
      const { _id, ...rest } = majorUpdate;

      const res = await update(_id, {
        ...rest,
      });

      notify("success", "Update successfully");
      const newData = listMajor?.map((i) => {
        if (i._id === _id) return { id: res?.data?._id, ...res?.data };
        else return i;
      });
      setListMajor(newData);
      setIsOpenModalUpdate(false);
    } catch (error) {
      console.log("hello");
    }
  };

  useEffect(() => {
    const getListMajor = async () => {
      try {
        const res = await list();
        setListMajor(res.data?.map((e) => ({ id: e._id, ...e })));
      } catch (error) {
        throw error;
      }
    };
    getListMajor();
  }, []);

  return (
    <MainLayout>
        <Box>
          <Button fullWidth size="large" variant="contained">
            Major Management
          </Button>
  
          <Box mt={2} >
            <Grid
              container
              spacing={2}
              component={"form"}
              onSubmit={handleCreateMajor}
              
            >
              <Grid item xs={6} >
                <TextField
                  fullWidth
                  size="small"
                  label="Add new major"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} // Đổi màu nền tại đây

                  required
                />
              </Grid>

              <Grid item xs={2}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                  justifyContent={"center"}
                  height={"100%"}
                >
                  <Button variant="contained" type="submit">
                    Add news
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          <Box   mt={4} sx={{
            background: "rgba(255, 255, 255, 0.8)",
            padding: "1rem",
          }}> {/* Đổi màu nền tại đây */}

              <Box height={"40vh"} width={"100%"} mt={4} >
                <DataGrid rows={listMajor} columns={columns} hideFooter={true} />
              </Box>
              <ModalUpdate
                open={isOpenModalUpdate}
                handleClose={() => setIsOpenModalUpdate(false)}
                handleOk={handleUpdateMajor}
              >
                <Typography variant="subtitle2" my={2}>
                  Name Of Major:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={majorUpdate?.name}
                  onChange={(e) =>
                    setMajorUpdate({ ...majorUpdate, name: e.target.value })
                  }
         
                />
                <Typography variant="subtitle2" my={2}>
                  Status
                </Typography>
                <RadioGroup
                  row
                  value={majorUpdate?.isBlock}
                  onChange={(e) =>
                    setMajorUpdate({ ...majorUpdate, isBlock: e.target.value })
                  }
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio size="small" />}
                    label="Open"
                  />
                  <FormControlLabel
                    value={0}
                    control={<Radio size="small" />}
                    label="Close"
                  />
                </RadioGroup>
              </ModalUpdate>
            </Box>
      </Box>
    </MainLayout>
  );
}

export default MajorManagement;
