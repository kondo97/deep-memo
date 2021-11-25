import React, { useEffect, useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import CustomPaper from "components/customUI/CustomPaper";
import ArrowTop from "components/ArrowTop";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Redirect from "./hooks/redirect";
import axios from "axios";
import { useRouter } from "next/router";
import { PostProps } from "types/PostProps";


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
      const res = await axios.get(`/api/${router.query.id}`);
      setPost(res.data);
    };
    if (id) {
      getPost();
    }
  }, [id]);

  console.log(post[0]);

  const dummy = 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認す'

  return (
    <>
      <ArrowTop />
      <CustomPaper elevation={3}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          {/* {dummy} */}
          {post[0]?.title}
        </Typography>
        <Divider sx={{marginBottom: 5}} />
        <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
          {post[0]?.content}
        </ReactMarkdown>
      </CustomPaper>
    </>
  );
};

export default Post;
