import React from "react";
import { Typography, Box } from "@mui/material";
import CustomPaper from "components/customUI/CustomPaper";

const Post = () => {
  return (
    <div>
      <CustomPaper elevation={3}>
        <Box py={6} px={12}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            タイトルが入ります。
          </Typography>
        </Box>
      </CustomPaper>
    </div>
  );
};

export default Post;
