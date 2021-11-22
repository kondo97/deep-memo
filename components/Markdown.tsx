import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import markdown from "styles/Markdown.module.css";
import { Typography, Box } from "@mui/material";

const Markdown = (props: any) => {
  console.log(props);
  return (
    <>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        {props.title}
      </Typography>
      <Box className='markdown'>
        <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
          {props.contents}
        </ReactMarkdown>
      </Box>
    </>
  );
};

export default Markdown;
