import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import styles from 'styles/Home.module.css'
import CustomButton from "components/customUI/CustomButton";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.headerColor}>
        <Toolbar>
          <Link href="/" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles.pointer}>
              Memo
            </Typography>
          </Link>
          <Link href="/create" passHref>
            <CustomButton variant="contained" color="primary">新規作成</CustomButton>
          </Link>
          <CustomButton variant="contained" color="secondary">ログアウト</CustomButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
