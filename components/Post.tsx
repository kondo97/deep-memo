import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { formatDate } from "pages/hooks/formatDate";
import { turnCate } from "pages/hooks/turnCate"
import styles from "styles/Home.module.css"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import removeMd from 'remove-markdown';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 160,
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

const dummy = "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーでaa"

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <>
      <Item elevation={3} className={styles.parent}>
        <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="left" sx={{fontWeight: 600}}>{turnCate(dummy, 25)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" align="left">{turnCate(removeMd(dummy), 30)}</Typography>
        </Grid>
        <Grid item xs={12} className={styles.childBottomRight}>
          <Typography variant="subtitle2">{formatDate(post.createdAt)}</Typography>
        </Grid>
        </Grid>
      </Item>
    </>
  );
};

export default Post;
