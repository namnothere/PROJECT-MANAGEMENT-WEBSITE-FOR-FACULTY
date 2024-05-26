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
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDelete from "../../../common/ConfirmDelete";
import { getColor, getRole } from "../../../../utils/helpers/getRole";
import { deleteUser, findUser, update } from "../../../../utils/api/user";
import { notify } from "../../../../utils/helpers/notify";
import ModalUpdate from "../../../common/ModalUpdate";
import SelectMajor from "../../../common/SelectMajor";

function getRoleLabel(role) {
  switch (role) {
    case 3:
      return "Admin";
    case 1:
      return "Teacher";
    case 0:
      return "Student";
    case 2:
      return "Department Head";
    default:
      return "";
  }
}

function getRoleColor(role) {
  switch (role) {
    case 3:
      return "red"; // Màu đỏ
    case 1:
      return "green"; // Màu xanh lá cây
    case 0:
      return "primary"; // Màu xanh nước biển
    case 2:
      return "orange"; // Màu cam
    default:
      return "";
  }
}

function InfoAccount({ data, setList }) {
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [major, setMajor] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState(null);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      width: 150,
    },
    { field: "name", headerName: "Full Name", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
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
      renderCell: (params) => {
        const roleLabel = getRoleLabel(params.row.role);
        const color = getRoleColor(params.row.role);
        return (
          <Typography variant="body1" color={color}>
            {roleLabel}
          </Typography>
        );
      },
    },
    {
      field: "",
      width: 250,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                setIsOpenConfirmDelete(true);
                setIdDelete(params.row._id);
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setIsOpenModalUpdate(true);
                setIdUpdate(params.row._id);
              }}
            >
              Update
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleDelete = async () => {
    try {
      await deleteUser(idDelete);
      notify("success", "Delete account successfully");
      setIsOpenConfirmDelete(false);
      setList(data?.filter((e) => e._id !== idDelete));
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await update(idUpdate, {
        name,
        password,
        phone,
        birth,
        address,
        major,
        sex,
        role,
      });

      notify("success", "Update successfully");
      const newData = data?.map((i) => {
        if (i._id === idUpdate) return { id: res?.data?._id, ...res?.data };
        else return i;
      });
      setList(newData);
      setIsOpenModalUpdate(false);
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const getInfoUpdate = async () => {
      const res = await findUser(idUpdate);
      const user = res.data;
      setName(user?.name);
      setPassword(user?.password);
      setPhone(user?.phone);
      setMajor(user?.major?._id);
      setBirth(user?.birth);
      setAddress(user?.address);
      setUsername(user?.username);
      setEmail(user?.email);
      setSex(user?.sex);
      setRole(user?.role);
    };
    idUpdate && getInfoUpdate();
  }, [idUpdate]);

  return (
    
    <Box mt={3}>
      <Box height={"40vh"} width={"100%"} mt={0}  sx={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
        <DataGrid rows={data} columns={columns} hideFooter={true} />
      </Box>
      <ConfirmDelete
        open={isOpenConfirmDelete}
        handleOk={handleDelete}
        handleClose={() => setIsOpenConfirmDelete(false)}
      />
      <ModalUpdate
        open={isOpenModalUpdate}
        handleClose={() => setIsOpenModalUpdate(false)}
        handleOk={handleUpdate}
      >
        <Grid container spacing={2} py={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Full Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Username"
              size="small"
              value={username}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              size="small"
              value={email}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectMajor
              value={major}
              setValue={setMajor}
              disabled={role === 3}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Birthday"
              size="small"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Address"
              size="small"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              row
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <FormControlLabel
                value={1}
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                value={0}
                control={<Radio size="small" />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </ModalUpdate>
    </Box>
  );
}

export default InfoAccount;
