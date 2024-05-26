import AccountManagement from "../pages/admin/AccountManagement";
import Login from "../pages/guest/Login";
import StudentHome from "../pages/student/StudentHome";
import StudentInfo from "../pages/student/StudentInfo";
import SubTopic from "../pages/student/SubTopic";
import TeacherHome from "../pages/teacher/TeacherHome";
import TeacherInfo from "../pages/teacher/TeacherInfo";
import ManagementApproveSubTopic from "../pages/management/ManagementApproveSubTopic";
import ProviderCodeTopic from "../pages/management/ProviderCodeTopic";
import ManagementInfo from "../pages/management/ManagementInfo";
import AssignTeacherReview from "../pages/management/AssignTeacherReview";
import StudentCodeTopic from "../pages/student/StudentCodeTopic";
import AssignedReview from "../pages/teacher/AssignedReview";
import TeacherSubTopic from "../pages/teacher/TeacherSubTopic";
import GuestInstruction from "../pages/guest/GuestInstruction";
import GuestPreference from "../pages/guest/GuestPreference";
import GuestContact from "../pages/guest/GuestContact";
import MajorManagement from "../pages/admin/MajorManagement";
import PeriodManagement from "../pages/admin/PeriodManagement";
import ManagementSubTopic from "../pages/management/ManagementSubTopic";
import TeacherSelectTopic from "../pages/teacher/TeacherSelectTopic";
import ManagementHome from "../pages/management/ManagementHome";
import AdminSubTopic from "../pages/admin/AdminSubTopic";
import AdminHome from "../pages/admin/AdminHome";

export const listRouter = {
  admin: [
    { path: "/", element: <AdminHome /> },
    { path: "/accountManagement", element: <AccountManagement /> },
    { path: "/adminSubTopic", element: <AdminSubTopic /> },
    { path: "/majorManagement", element: <MajorManagement /> },
    { path: "/periodManagement", element: <PeriodManagement /> },
  ],
  management: [
    {
      path: "/",
      element: <ManagementHome />,
    },
    {
      path: "/managementInfo",
      element: <ManagementInfo />,
    },
    {
      path: "/managementSubTopic",
      element: <ManagementSubTopic />,
    },
    {
      path: "/managementApproveSubTopic",
      element: <ManagementApproveSubTopic />,
    },
    {
      path: "/providerCodeTopic",
      element: <ProviderCodeTopic />,
    },
    {
      path: "/assignTeacherReview",
      element: <AssignTeacherReview />,
    },
  ],
  teacher: [
    { path: "/", element: <TeacherHome /> },
    { path: "/teacherInfo", element: <TeacherInfo /> },
    { path: "/assignedReview", element: <AssignedReview /> },
    { path: "/teacherSelectTopic", element: <TeacherSelectTopic /> },
    { path: "/teacherSubTopic", element: <TeacherSubTopic /> },
  ],
  student: [
    { path: "/studentCodeTopic", element: <StudentCodeTopic /> },
    { path: "/", element: <StudentHome /> },
    { path: "/studentInfo", element: <StudentInfo /> },
    { path: "/subTopic", element: <SubTopic /> },
  ],
  guest: [
    { path: "/", element: <GuestInstruction /> },
    { path: "/login", element: <Login /> },
    { path: "/guestPreference", element: <GuestPreference /> },
    { path: "/guestContact", element: <GuestContact /> },
  ],
};
