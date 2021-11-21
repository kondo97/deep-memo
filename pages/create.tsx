import React from "react";
import { TextField, Paper, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { display } from "@mui/system";

const CustomPaper = styled(Paper)({
  marginTop: 60,
  marginBottom: 40,
  marginLeft: 160,
  marginRight: 160
});

const CustomButton = styled(Button)({
  marginRight: 10,
  marignLeft: 10
})

const Create = () => {
  return (
    <>
      <CustomPaper elevation={3}>
        <Box py={6} px={12}>
          <TextField placeholder="タイトル" fullWidth required />
          <Box my={2} />
          <TextField placeholder="aaaa" multiline fullWidth rows={8} />
        </Box>
      </CustomPaper>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CustomButton variant="contained" color="secondary">破棄</CustomButton>
        <CustomButton variant="contained" color="info">追加</CustomButton>
      </Box>
    </>
  );
};

export default Create;
