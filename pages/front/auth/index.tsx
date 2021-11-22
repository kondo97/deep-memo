import React, { useState } from "react";
import { TextField, Box, Button, Grid, Divider, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "styles/Home.module.css";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {};
  return (
    <>
    <Paper className={styles.center}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth/>
        <TextField fullWidth />
        <Button type="submit" variant="contained" color="secondary">
          ログイン
        </Button>
      </form>
      <Divider />
      </Paper>
    </>
  );
};

export default Auth
