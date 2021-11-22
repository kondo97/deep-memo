import React, { useState } from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomPaper from "components/customUI/CustomPaper";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

const CustomButton = styled(Button)({
  marginRight: 10,
  marignLeft: 10,
});

var Showdown  = require('showdown')
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Create = () => {
  const [title, setTitle] = useState("");
  const setDataTitle = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const [contents, setContents] = useState("");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );
  return (
    <>
      <CustomPaper elevation={3}>
        {/* <Grid container spacing={2}>
          <Grid item xs={6}> */}
        <TextField
          placeholder="タイトル"
          fullWidth
          required
          onChange={setDataTitle}
        />
        {/* <TextField
              placeholder="Markdownで入力できます。"
              multiline
              fullWidth
              rows={8}
              onChange={setDataContents}
            /> */}
        {/* <ReactMde value={contents} onChange={setContents} />
          </Grid>
          <Grid item xs={6}>
            <Markdown contents={contents} title={title} />
          </Grid>
        </Grid> */}
        <ReactMde
          value={contents}
          onChange={setContents}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
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
