import { Paper, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import { useRouter } from 'next/router';
import * as React from 'react';
import ReactStars from 'react-stars';
import removeMd from 'remove-markdown';
import formatDate from 'src/pages/hooks/formatDate';
import turnCate from 'src/pages/hooks/turnCate';
import styles from 'src/styles/Home.module.css';
import { PostProps } from 'types/PostProps';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 160,
  marginTop: 30,
}));

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const router = useRouter();
  const goPostPage = () => {
    router.push(`${post.id}`);
  };
  return (
    <>
      <Item elevation={3} className={`${styles.parent} ${styles.pointer}`} onClick={goPostPage}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='subtitle1' align='left' sx={{ fontWeight: 600 }}>
              {turnCate(post.title, 25)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2' align='left'>
              {turnCate(removeMd(post.content), 40)}
            </Typography>
          </Grid>
          <Grid item xs={6} className={styles.childBottomLeft}>
          <Typography variant='subtitle2'>
            <ReactStars
              value={post.rating}
              count={5}
              size={20}
              color2={'#ffd700'}
              half={false}
              edit={false}
            />
            </Typography>
          </Grid>
          <Grid item xs={6} className={styles.childBottomRight}>
            <Typography variant='subtitle1'>{formatDate(post.createdAt)}</Typography>
          </Grid>
        </Grid>
      </Item>
    </>
  );
};

export default Post;
