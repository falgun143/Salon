import React, { useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material/";
import Add from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseButton from "./CloseButton";
import CustomButton from "./CustomButton";

interface CardFeature {
  title: string;
  timestamp: string;
  description: string;
  cost: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Card1 = ({ feature }: { feature: CardFeature }) => {
  const theme = useTheme();
  const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseButton = () => {
    setToggle((prev) => !prev);
    setOpen(false);
  };
  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setToggle((prev) => !prev);
  };

  return (
    <>
      <Box
        style={{
          borderRadius: 9,
          height: "140px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        sx={{
          padding: {
            xs: "10px",
            md: "20px",
            lg: "30px",
          },

          border: {
            xs: "none",
            lg: toggle ? "2px solid #6950f3" : "1px solid #d3d3d3",
          },
          boxSizing: "border-box",
          borderColor: toggle ? "#6950f3" : "#d3d3d3",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#e7e7e7",
            borderColor: !toggle ? "#989898" : "#6950f3",
          },
        }}
        onClick={handleClickOpen}
      >
        <Box width={"90%"}>
          <Typography sx={{ fontWeight: 500 }} fontSize={"17px"}>
            {feature.title}
          </Typography>
          <Typography
            sx={{ fontWeight: 500 }}
            color={"#7f7f7f"}
            variant="body1"
          >
            {feature.timestamp}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              color: "#7f7f7f",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
            variant="body1"
          >
            {feature.description}
          </Typography>
          <Typography variant="subtitle1">{feature.cost}</Typography>
        </Box>

        <Box
          onClick={handleToggle}
          sx={{
            padding: "1px",
            borderRadius: "7px",
            cursor: "pointer",
            backgroundColor: toggle ? "#6950f3" : " #e7e7e7",
            color: toggle ? "white" : "black",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: toggle ? "#5441bd" : " #b1b0b0",
            },
          }}
        >
          {toggle ? <DoneIcon /> : <Add />}
        </Box>
      </Box>
      {isBelowLg && <hr style={{ width: "100%", borderColor: "#f8f8f8" }} />}

      <BootstrapDialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            display: "flex",
            flexDirection: "column",
            height: {
              xs: "90vh",
              lg: "360px",
            },

            minWidth: {
              xs: "90vw",
              md: "720px",
            },
            borderRadius: 4,
            justifyContent: "center",
            alignItems: "center",
            overflowX: "hidden",
          },
        }}
      >
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <CloseButton onClick={handleClose} />
        </Box>

        <DialogContent  style={{  width: "100%", padding: "0px 0px 0px 50px"}}>
          <Typography fontSize={"28px"} fontWeight={"bold"} marginBottom={3}>
            {feature.title}
          </Typography>
          <Typography color={"#757676"} fontSize={"17px"}>
            {feature.timestamp}
          </Typography>
          <Typography
            variant="subtitle2"
            color={"#000000"}
            marginBottom={2}
            fontWeight={500}
          >
            {feature.cost}
          </Typography>
          {feature.description && (
            <Typography variant="subtitle2" color={"#000000"} fontWeight={500}>
              {feature.description}
            </Typography>
          )}
        </DialogContent>

        <Box
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
          sx={{ marginBottom: 2 }}
        >
          <CustomButton
            text={!toggle ? "Add to booking" : "Remove"}
            toggle={toggle}
            onClick={handleCloseButton}
          />
        </Box>
      </BootstrapDialog>
    </>
  );
};

export default Card1;
