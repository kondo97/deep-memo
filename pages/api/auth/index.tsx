import React from "react";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import CustomLoginPaper from "components/customUI/CustomLoginPaper";

const Auth = () => {
  const CustomGrid = styled(Grid)({
    textAlign: "center",
  });
  const CustomButton = styled(Button)({
    width: 250,
  });

  return (
    <>
      <CustomLoginPaper>
        <Grid container spacing={4}>
          <CustomGrid item xs={12}>
            <Link href="auth/mailLogin" passHref>
              <CustomButton variant="contained" color="info">
                メールアドレスでログイン
              </CustomButton>
            </Link>
          </CustomGrid>
          <CustomGrid item xs={12}>
            <CustomButton variant="contained" color="info">
              ゲストアカウントでログイン
            </CustomButton>
          </CustomGrid>
          <CustomGrid item xs={12}>
            <Link href="auth/newLogin" passHref>
              <CustomButton variant="contained" color="info">
                新規ユーザー登録
              </CustomButton>
            </Link>
          </CustomGrid>
        </Grid>
      </CustomLoginPaper>
    </>
  );
};

export default Auth;