import React from "react";
import { Typography, Box, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ArrowTop = () => {
  return (
    <>
      <Link href='/' color="inherit" underline="none">
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <ArrowBackIcon />
          <Typography
            component="span"
            variant="h6"
            gutterBottom
            sx={{ padding: "10px 0 0 10px" }}
          >
            Topへ戻る
          </Typography>
        </Box>
      </Link>
    </>
  );
};

export default ArrowTop;
