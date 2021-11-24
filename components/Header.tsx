import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import styles from "styles/Home.module.css";
import CustomButton from "components/customUI/CustomButton";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

export default function Header() {
  const [session, loading] = useSession();
  const signOutConfirm = () => {
    const confirm = window.confirm("ログアウトしますか。");
    if (confirm) {
      console.log("logout");
      signOut();
    }
  };
  const router = useRouter();
  const goTop = () => {
    if(session)
    router.push("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.headerColor}>
        <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className={styles.pointer}
              onClick={() => goTop()}
            >
              Deep Memo
            </Typography>
          {session && (
            <>
              <Link href="/create" passHref>
                <CustomButton variant="contained" color="primary">
                  新規作成
                </CustomButton>
              </Link>
              <CustomButton
                variant="contained"
                color="secondary"
                onClick={() => signOutConfirm()}
              >
                ログアウト
              </CustomButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
