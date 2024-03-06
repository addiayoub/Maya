import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton, Typography, Divider } from "@mui/material";
import { X } from "react-feather";

const basedStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  borderRadius: 6,
  boxShadow: 24,
  padding: "20px",
  maxWidth: "100%",
};

export default function ModalComponent({
  open,
  handleClose,
  children,
  style = {},
  withHeader,
  headerText,
  className,
  containerClasses,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className={`overflow-auto ${className}`}
      >
        <Box sx={{ ...basedStyle, ...style }} className={`${containerClasses}`}>
          {withHeader && (
            <Box className="mb-3">
              <Box className="flex justify-between items-center mb-1">
                <Typography variant="h6" component="h4">
                  {headerText}
                </Typography>
                <IconButton onClick={handleClose}>
                  <X size={18} color="var(--error-color)" />
                </IconButton>
              </Box>
              <Divider />
            </Box>
          )}
          {children}
        </Box>
      </Modal>
    </div>
  );
}
