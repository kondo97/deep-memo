import React, { useState } from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import CustomPaper from "components/customUI/CustomPaper";
import CustomButton from "components/customUI/CustomButton";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useForm } from "react-hook-form";
import styles from "styles/Home.module.css";
import Redirect from "pages/hooks/redirect";
import axios from "axios";
import Router from "next/router";
import { PostProps } from "types/PostProps";

var Showdown = require("showdown");
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Create: React.FC<{ props?: PostProps; editFlag: boolean; id?: number }> =
  ({ props, editFlag, id }) => {
    Redirect();
    const [title, setTitle] = useState<string | undefined>(props?.title);
    const setDataTitle = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      e.preventDefault();
      setTitle(e.target.value);
    };
    const [content, setContent] = useState<string | undefined>(props?.content);
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
      "write"
    );

    //入力フォーム
    type Post = {
      title: string;
      content: string;
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Post>();
    const titleField = register("title", { required: true, maxLength: 20 });

    const onSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      !editFlag
        ? await axios
            .post("/api/create", {
              title: title,
              content: content,
            })
            .then((res) => {
              alert("追加しました。");
              Router.push("/");
            })
            .catch((error) => {
              console.error(error);
            })
        : await axios
            .put(
              "api/update",
              { title: title, content: content },
              {
                params: {
                  id: id,
                },
              }
            )
            .then((res) => {
              alert("変更を保存しました。");
              Router.push("/");
            })
            .catch((error) => {
              console.error(error);
            });
    };

    return (
      <>
        <CustomPaper elevation={3}>
          <form onSubmit={onSubmit}>
            <TextField
              placeholder="タイトル"
              fullWidth
              {...titleField}
              value={title}
              onChange={(e) => {
                titleField.onChange(e);
                setDataTitle(e);
              }}
              required
            />
            <Box sx={{ textAlign: "right" }}>
              {errors.title && errors.title.type === "required" && (
                <span className={styles.alert}>必須項目</span>
              )}
              {errors.title && errors.title.type === "maxLength" && (
                <span className={styles.alert}>最大30文字</span>
              )}
            </Box>
            <Box my={6} />
            <ReactMde
              value={content}
              onChange={setContent}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
            <Box sx={{ display: "flex", justifyContent: "center" }} mt={6}>
              {!editFlag && (
                <>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    破棄
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    追加
                  </CustomButton>
                </>
              )}
              {editFlag && (
                <>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    キャンセル
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    変更を保存
                  </CustomButton>
                </>
              )}
            </Box>
          </form>
        </CustomPaper>
      </>
    );
  };

export default Create;
