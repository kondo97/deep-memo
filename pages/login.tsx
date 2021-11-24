import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import CustomLoginPaper from "components/customUI/CustomLoginPaper";
import styles from "styles/Home.module.css";
import { getProviders, signIn, signOut, useSession } from "next-auth/client";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/dist/client/router";

const Auth = () => {
  const CustomGrid = styled(Grid)({
    textAlign: "center",
  });
  const CustomButton = styled(Button)({
    width: 250,
    borderRadius: "30px",
    "&:hover": {
      background: "rgba(0,0,0,0.5)",
    },
  });

  const [session, loading] = useSession();
  const router = useRouter();

  const authorized = () => {
    if (session) {
      router.push("/");
    }
  };
  useEffect(() => {
    authorized();
  });

  return (
    <>
      {!session && (
        <>
          {loading ? (
            <>Loading ...</>
          ) : (
            <>
              <CustomLoginPaper>
                <Grid container spacing={4}>
                  <CustomGrid item xs={12}>
                    <CustomButton
                      variant="contained"
                      className={styles.github}
                      onClick={() => signIn("github")}
                    >
                      GitHub
                    </CustomButton>
                  </CustomGrid>
                  <CustomGrid item xs={12}>
                    <CustomButton
                      variant="contained"
                      color="info"
                      onClick={() => signIn("credentials")}
                    >
                      ゲストユーザー
                    </CustomButton>
                    {/* </Link> */}
                  </CustomGrid>
                </Grid>
              </CustomLoginPaper>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Auth;
