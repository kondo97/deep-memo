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
            <Link href="/api/auth/signin" passHref>
              <CustomButton variant="contained" color="info">
                GitHub
              </CustomButton>
            </Link>
          </CustomGrid>
          <CustomGrid item xs={12}>
            <CustomButton variant="contained" color="info">
              ゲストアカウントでログイン
            </CustomButton>
          </CustomGrid>
        </Grid>
      </CustomLoginPaper>
    </>
  );
};

export default Auth;