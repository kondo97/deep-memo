import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 150,
  marginTop: 30,
}));

export type PostProps = {
  authorId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  title: string;
};

const Post: React.FC<{ post: PostProps }> = ({post}) => {
  return (
    <>
      <Item elevation={3}>
        {post.title}
        {post.content}
        {post.createdAt}
      </Item>
    </>
  );
}

export default Post
