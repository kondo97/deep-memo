import { Paper, Grid, styled } from '@mui/material';
import axios from 'axios';
import type { NextPage } from 'next';
import { signOut, useSession, Provider, signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import Redirect from './hooks/redirect';
import Post from 'src/components/Post';
import { PostProps } from 'types/PostProps';

const Home = () => {
  Redirect();
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    const getAllPosts = async () => {
      const res = await axios.get('/api/getAllPosts');
      setPosts(res.data);
    };
    getAllPosts();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {posts.map((post: PostProps) => (
          <Grid item xs={3} key={post.id}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
