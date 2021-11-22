import React, { useState } from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomPaper from "components/customUI/CustomPaper";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useForm } from "react-hook-form";
import styles from "styles/Home.module.css";

const CustomButton = styled(Button)({
  marginRight: 10,
  marignLeft: 10,
});

var Showdown = require("showdown");
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Create = () => {
  const [title, setTitle] = useState<string>("");
  const setDataTitle = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const [contents, setContents] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  //フォーム
  type Post = {
    title: string;
    contents: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();
  const titleField = register("title", { required: true, maxLength: 20 });
  const onSubmit = () => {
    console.log(title);
    console.log(contents);
  };

  return (
    <>
      <CustomPaper elevation={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="タイトル"
            fullWidth
            {...titleField}
            onChange={(e) => {
              titleField.onChange(e);
              setDataTitle(e);
            }}
            required
          />
          <Box sx={{textAlign: 'right'}}>
            {errors.title && errors.title.type === "required" && (
              <span className={styles.alert}>必須項目</span>
            )}
            {errors.title && errors.title.type === "maxLength" && (
              <span className={styles.alert}>最大30文字</span>
            )}
          </Box>
          <Box my={6} />
          <ReactMde
            value={contents}
            onChange={setContents}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
          <Box sx={{ display: "flex", justifyContent: "center" }} mt={6}>
            <CustomButton type="submit" variant="contained" color="secondary">破棄</CustomButton>
            <CustomButton type="submit" variant="contained" color="secondary">保存</CustomButton>
          </Box>
        </form>
      </CustomPaper>
    </>
  );
};

export default Create;
