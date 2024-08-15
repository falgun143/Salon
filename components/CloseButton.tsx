import { Box } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const CloseButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        padding: "12px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#f6f6f6",
        },
      }}
      onClick={onClick} 
    >
      <CloseIcon />
    </Box>
  );
};

export default CloseButton;
