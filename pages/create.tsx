import React, { useState } from "react";
import { TextField, Paper, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { display } from "@mui/system";
import CustomPaper from "components/customUI/CustomPaper";
import Markdown from "components/Markdown";

const CustomButton = styled(Button)({
  marginRight: 10,
  marignLeft: 10,
});

const Create = () => {
  const [contents, setContents] = useState();
  const setData = (e: any) => {
    e.preventDefault();
    setContents(e.target.value);
  };
  return (
    <>
      <CustomPaper elevation={3}>
        <TextField placeholder="タイトル" fullWidth required />
        <TextField
          placeholder="Markdownで入力できます。"
          multiline
          fullWidth
          rows={8}
          onChange={setData}
        />
        <Markdown contents={contents} />
      </CustomPaper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CustomButton variant="contained" color="secondary">
          破棄
        </CustomButton>
        <CustomButton variant="contained" color="info">
          追加
        </CustomButton>
      </Box>
    </>
  );
};

export default Create;
