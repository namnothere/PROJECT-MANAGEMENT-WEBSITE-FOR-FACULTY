import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ModalUpdateInfo from "../../components/screens/student/studentInfo/ModalUpdateInfo";
import TableUserInfomation from "../../components/screens/student/studentInfo/TableUserInfomation";
import MainLayout from "../../components/layout/MainLayout";
import { findUser, update } from "../../utils/api/user";
import { notify } from "../../utils/helpers/notify";

function TeacherInfo() {
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleUpdateUser = async () => {
    try {
      const res = await update(currentUser?._id, currentUser);
      setCurrentUser(res.data);
      console.log(res.data);
      setIsOpenModalUpdate(false);
      notify("success", "Update account successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const res = await findUser(id);
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  return (
    <MainLayout type={"student"}>
      <Button fullWidth size="large" variant="contained">
        Lecturer Information
      </Button>
      <Box mt={4}> 
        <TableUserInfomation
          user={currentUser}
          handleUpdate={() => setIsOpenModalUpdate(true)}
        />
      </Box>
      <ModalUpdateInfo
        data={currentUser}
        setData={setCurrentUser}
        open={isOpenModalUpdate}
        handleClose={() => setIsOpenModalUpdate(false)}
        handleOk={handleUpdateUser}
      />
    </MainLayout>
  );
}

export default TeacherInfo;
