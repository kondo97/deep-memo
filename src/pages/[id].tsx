import { Typography, Box, Divider, Button, styled } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { formatDate } from './hooks/formatDate';
import Redirect from './hooks/redirect';
import ArrowTop from 'src/components/ArrowTop';
import Create from 'src/components/Create';
import CustomPaper from 'src/components/customUI/CustomPaper';
import styles from 'src/styles/Home.module.css';
import { PostProps } from 'types/PostProps';

const Post = () => {
  Redirect();

  const [editFlag, setEditFlag] = useState<boolean>(false);

  const [post, setPost] = useState<PostProps[]>([]);
  const router = useRouter();
  const [id, setId] = useState<number>();

  // パラメーターが利用になったらrouterをセットする。
  useEffect(() => {
    if (router.asPath !== router.route) {
      setId(Number(router.query.id));
    }
  }, [router]);

  //パラメーターに値がセットさせたら実行される。
  const [session, loading] = useSession();
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('api/getPost', {
        params: {
          id: router.query.id,
        },
      });
      setPost(res.data);
    };
    if (id && session) {
      getPost();
    }
  }, [id, router.query.id, session]);

  const CustomButton = styled(Button)({
    width: 250,
    borderRadius: '30px',
  });

  //削除
  const deletePost = async () => {
    if (window.confirm('削除しますか。')) {
      await axios
        .delete('/api/delete', {
          params: {
            id: router.query.id,
          },
        })
        .then((res) => {
          alert('削除しました。');
          router.push('/');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <ArrowTop />
      {!editFlag && (
        <>
          <Box sx={{ textAlign: 'right', marginRight: 22 }}>
            <Button onClick={deletePost}>削除</Button>
          </Box>
          <CustomPaper elevation={3} className={styles.parent}>
            <Typography
              variant='subtitle2'
              sx={{ textAlign: 'right' }}
              className={styles.childTopRight}
            >
              作成日：{formatDate(post[0]?.createdAt)}
            </Typography>
            <Typography variant='h4' component='div' gutterBottom sx={{ textAlign: 'center' }}>
              {/* {dummy} */}
              {post[0]?.title}
            </Typography>
            <Divider sx={{ marginBottom: 5 }} />
            <Box mx={3}>
              <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
                {post[0]?.content}
              </ReactMarkdown>
            </Box>
          </CustomPaper>
          <Box sx={{ textAlign: 'center' }} mt={6}>
            <CustomButton
              variant='contained'
              color='primary'
              onClick={() => setEditFlag(!editFlag)}
            >
              編集
            </CustomButton>
          </Box>
        </>
      )}
      {editFlag && (
        <>
          <Create props={post[0]} editFlag={editFlag} setEditFlag={setEditFlag} id={id} />
        </>
      )}
    </>
  );
};

export default Post;
