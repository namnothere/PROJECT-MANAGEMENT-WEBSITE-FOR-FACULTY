export const getRole = (value) => {
  let label;
  switch (value) {
    case 0:
      label = "Student";
      break;
    case 1:
      label = "Lecturer";
      break;
    case 2:
      label = "Head";
      break;
    case 3:
      label = "Admin";
      break;
    default:
      label = "";
      break;
  }

  return label;
};

export const getColor = (value) => {
  let color;
  switch (value) {
    case 0:
      color = "primary";
      break;
    case 1:
      color = "success";
      break;
    case 2:
      color = "error";
      break;
    case 3:
      color = "secondary";
      break;
    default:
      color = "";
      break;
  }

  return color;
};
