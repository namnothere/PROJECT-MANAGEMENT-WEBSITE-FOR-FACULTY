import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SwitchCameraOutlinedIcon from "@mui/icons-material/SwitchCameraOutlined";

// Create an array containing empty items
const emptyItems = Array.from({ length: 10 }).map(() => ({ name: "" }));

export const adminSideBar = [
  {
    name: "Manage Projects",
    icon: <HomeOutlinedIcon />,
    href: "/",
  },
  {
    name: "Account Management",
    icon: <PersonOutlineIcon />,
    href: "/accountManagement",
  },
  {
    name: "Manage Majors",
    icon: <DescriptionOutlinedIcon />,
    href: "/majorManagement",
  },
  {
    name: "Register Project",
    icon: <AddCircleOutlineIcon />,
    href: "/adminSubTopic",
  },
  {
    name: "Manage Registration Periods",
    icon: <CalendarTodayOutlinedIcon />,
    href: "/periodManagement",
  },
  ...emptyItems,

];

export const managementSideBar = [
  { name: "Home", icon: <HomeOutlinedIcon />, href: "/" },
  {
    name: "Personal Information",
    icon: <PersonOutlineIcon />,
    href: "/managementInfo",
  },
  {
    name: "Register Project",
    icon: <AddCircleOutlineIcon />,
    href: "/managementSubTopic",
  },
  {
    name: "Approve Project Submissions",
    icon: <CheckCircleOutlineIcon />,
    href: "/managementApproveSubTopic",
  },
  {
    name: "Assign Reviewers",
    icon: <RateReviewOutlinedIcon />,
    href: "/assignTeacherReview",
  },

];

export const teacherSideBar = [
  { name: "Manage Projects", icon: <HomeOutlinedIcon />, href: "/" },
  {
    name: "Personal Information",
    icon: <PersonOutlineIcon />,
    href: "/teacherInfo",
  },
  {
    name: "Choose Project",
    icon: <SwitchCameraOutlinedIcon />,
    href: "/teacherSelectTopic",
  },
  {
    name: "Register Project",
    icon: <AddCircleOutlineIcon />,
    href: "/teacherSubTopic",
  },
  {
    name: "Assigned Projects for Review",
    icon: <RateReviewOutlinedIcon />,
    href: "/assignedReview",
  },
   ...emptyItems,

];

export const studentSideBar = [
  { name: "Manage Projects", icon: <HomeOutlinedIcon />, href: "/" },
  {
    name: "Personal Information",
    icon: <PersonOutlineIcon />,
    href: "/studentInfo",
  },
  {
    name: "Register Project",
    icon: <AddCircleOutlineIcon />,
    href: "/subTopic",
  },
  ...emptyItems,
];

export const guestSideBar = [
  { name: "Home", icon: <PictureAsPdfOutlinedIcon />, href: "/" },

  {
    name: "Reference",
    icon: <MenuBookOutlinedIcon />,
    href: "/guestPreference",
  },
  {
    name: "Contact",
    icon: <MailOutlineIcon />,
    href: "/guestContact",
  },
  ...emptyItems,
];
