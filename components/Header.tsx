import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import styles from 'styles/Home.module.css'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles.pointer}>
              Memo
            </Typography>
          </Link>
          <Link href="/create" passHref>
            <Button variant="contained" color="secondary">新規作成</Button>
          </Link>
          <Button variant="contained" color="success" className={styles.lowercase}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
