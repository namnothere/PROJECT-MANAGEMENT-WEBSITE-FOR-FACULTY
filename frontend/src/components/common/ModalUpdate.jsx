import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const ModalUpdate = ({
  open,
  title,
  children,
  handleClose,
  handleOk,
  showCancel = true,
  titleOk,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#d9e9f9',
          opacity: 0.9,
        },
      }}
    >
      <Box component="form" onSubmit={handleOk}>
        <DialogTitle sx={{ textAlign: 'center' }} id="alert-dialog-title">
          <Typography fontWeight="bold" variant="h6">
            {title || "Update Box"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box>{children}</Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {showCancel && (
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{
                  bgcolor: 'red',
                  color: 'white',
                  marginRight: 2,
                }}
                size="small"
              >
                Cancel
              </Button>
            )}
            <Button autoFocus onClick={handleOk} size="small" variant="contained">
              {titleOk || "Accept"}
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ModalUpdate;
