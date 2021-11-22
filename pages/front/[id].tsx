import React from "react";
import { Typography, Box } from "@mui/material";
import CustomPaper from "components/customUI/CustomPaper";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Post = () => {
  return (
    <>
      <CustomPaper elevation={3}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          タイトルが入ります。
        </Typography>
          <ReactMarkdown
            plugins={[gfm]}
            unwrapDisallowed={false}
          >ああ</ReactMarkdown>
      </CustomPaper>
    </>
  );
};

export default Post;
