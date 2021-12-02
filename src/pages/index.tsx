import {
  Grid,
  Stack,
  Pagination,
  Divider,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import Redirect from './hooks/useRedirect';
import Post from 'src/components/Post';
import styles from 'src/styles/Home.module.css';
import { PostProps } from 'types/PostProps';

const displayCount = 2;

const Home = () => {
  Redirect();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [count, setCount] = useState<number>(0);
  const [session, loading] = useSession();
  const [page, setPage] = useState<number>(1);
  const [pagenationFlag, setPagenationFlag] = useState(true);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [order, setOrder] = useState('作成日(降順)');
  const handleChange = (event: any) => {
    setOrder(event.target.value as string);
  };
  const orderWords = ['作成日(降順)', '作成日(昇順)', 'スター(高い順)', 'スター(低い順)', '色別'];
  
  // 日付の昇順・降順
  const [orderDate, setOrderDate] = useState('desc');
  useEffect(() => {
    order === '作成日(降順)' && setOrderDate('desc');
    order === '作成日(昇順)' && setOrderDate('asc');
  }, [order]);

  //スターの昇順・降順
  const [orderRating, setOrderRating] = useState('desc')
  useEffect(() => {
    order === 'スター(高い順)' && setOrderRating('desc')
    order === 'スター(低い順)' && setOrderRating('asc');
  }, [order])

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await axios.get('/api/getAllPosts', {
        params: {
          id: session?.user.id,
          skip: (page - 1) * displayCount,
          orderDate: orderDate,
          orderRating: orderRating,
        },
      });
      setPosts(res.data.posts);
      setCount(res.data.count);
      setPagenationFlag(false);
    };
    session && getAllPosts();
  }, [session, page, orderDate, orderRating]);

  return (
    <>
      <Box sx={{ width: '80%', marginX: 'auto' }} mt={9} mb={6}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <Select
                labelId='simple-select-label'
                id='simple-select'
                value={order}
                onChange={handleChange}
              >
                {orderWords.map((word, index) => {
                  return (
                    <MenuItem key={index} value={word}>
                      {word}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}
          >
            <Typography
              variant='subtitle1'
              align='right'
              className={pagenationFlag ? styles.notVisible : ''}
            >{`${count}件中 ${(page - 1) * displayCount + 1} ~ ${
              (page - 1) * displayCount + posts.length
            }件`}</Typography>
            <Box my={4} />
          </Grid>
        </Grid>
        <Divider />
      </Box>
      <Grid container spacing={2}>
        {posts.map((post: PostProps) => (
          <Grid item xs={3} key={post.id}>
            <Post post={post} />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'center' }}
          mt={9}
          className={pagenationFlag ? styles.notVisible : ''}
        >
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(count / displayCount)}
              color='primary'
              onChange={handlePageChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
