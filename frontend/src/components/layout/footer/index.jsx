import { Box, Typography, styled } from "@mui/material";
import React from "react";

const WhiteBox = styled(Box)({
  background: "white",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  width: "100%",
  textAlign: "center", // Canh giữa nội dung theo chiều ngang
});
function Footer() {
  return (
    <WhiteBox>
      <Typography fontSize={12} color="#1a5792" mb={1}>
        Ho Chi Minh City University Technology and Education
      </Typography>
      <Typography fontSize={12} color="#1a5792" mb={1}>
        Address: 1 Vo Van Ngan, Linh Chieu Ward, Thu Duc City, Ho Chi Minh City.
      </Typography>
      <Typography fontSize={12} color="#1a5792" mb={1}>
        Phone: (+84 - 028) 38968641 - (+84 -028) 38961333 - (+84 -028) 37221223
      </Typography>
      <Typography fontSize={12} color="#1a5792" mb={1}>
        Admissions Consulting Hotline: (+84 - 028) 37222764
      </Typography>
      <Typography fontSize={12} color="#1a5792" mb={1}>
        Fax: (+84 - 028) 38964922
      </Typography>
      <Typography fontSize={12} color="#1a5792">
        E-mail: ptchc@hcmute.edu.vn
      </Typography>
    </WhiteBox>
  );
}

export default Footer;
