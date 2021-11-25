import React, { useEffect, useState } from "react";
import { Typography, Box, Divider, Button, styled } from "@mui/material";
import CustomPaper from "components/customUI/CustomPaper";
import ArrowTop from "components/ArrowTop";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Redirect from "./hooks/redirect";
import axios from "axios";
import { useRouter } from "next/router";
import { PostProps } from "types/PostProps";
import styles from "styles/Home.module.css";
import { formatDate } from "./hooks/formatDate";

const Post = () => {
  Redirect();
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
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('api/getPost', {
        params: {
          id: router.query.id
        }
      });
      // const res = await axios.get(`/api/${router.query.id}`);
      setPost(res.data);
    };
    if (id) {
      getPost();
    }
  }, [id]);

  const CustomButton = styled(Button)({
    width: 250,
    borderRadius: "30px",
  });

  //削除
  const deletePost = async () => {
    if (window.confirm('削除しますか。')){
        await axios.delete('/api/delete', {
          params: {
            id: router.query.id
          }
        }).then((res) => {
        alert('削除しました。')
        router.push('/')
        }).catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <>
      <ArrowTop />
      <Box sx={{ textAlign: "right", marginRight: 22 }}>
        <Button onClick={deletePost}>削除</Button>
      </Box>
      <CustomPaper elevation={3} className={styles.parent}>
        <Typography
          variant="subtitle2"
          sx={{ textAlign: "right" }}
          className={styles.childTopRight}
        >
          作成日：{formatDate(post[0]?.createdAt)}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
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
      <Box sx={{ textAlign: "center" }} mt={6}>
        <CustomButton variant="contained" color="primary">
          編集
        </CustomButton>
      </Box>
    </>
  );
};

export default Post;
