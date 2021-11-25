import React, { useState } from "react";
import {
  TextField,
  Box,
} from "@mui/material";
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
import router from "next/router";

var Showdown = require("showdown");
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Create: React.FC<{
  props?: PostProps;
  editFlag: boolean;
  id?: number;
  setEditFlag?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ props, editFlag, id, setEditFlag }) => {
  Redirect();
  const [title, setTitle] = useState<string | undefined>(props?.title);
  const setDataTitle = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const [content, setContent] = useState<string | undefined>(props?.content);
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  //入力フォーム
  type Post = {
    title: string;
    content: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<Post>({ mode: 'onChange' });
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

  const destructionCreate = () => {
    if (confirm("作成途中のデータを削除します。")) {
      setTitle("");
      setContent("");
      if (confirm("トップに戻りますか。")) {
        router.push("/");
      }
    }
  };

  const cancelEdit = () => {
    confirm("キャンセルします。※変更は保存されません。") &&
    setEditFlag && setEditFlag(!editFlag);
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
                  onClick={destructionCreate}
                >
                  破棄
                </CustomButton>
                <CustomButton type="submit" variant="contained" color="primary" disabled={!formState.isValid}>
                  追加
                </CustomButton>
              </>
            )}
            {editFlag && (
              <>
                <CustomButton
                  variant="contained"
                  color="secondary"
                  onClick={cancelEdit}
                >
                  キャンセル
                </CustomButton>
                <CustomButton type="submit" variant="contained" color="primary" disabled={!formState.isValid}>
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
