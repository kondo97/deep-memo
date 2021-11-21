import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 150,
  marginTop: 30,
}));

export default function SimplePaper() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Item elevation={3}>xs=8</Item>
      </Grid>
      <Grid item xs={3}>
        <Item elevation={3}>xs=8</Item>
      </Grid>
      <Grid item xs={3}>
        <Item elevation={3}>xs=8</Item>
      </Grid>
      <Grid item xs={3}>
        <Item elevation={3}>xs=8</Item>
      </Grid>
      <Grid item xs={3}>
        <Item elevation={3}>xs=8</Item>
      </Grid>
      <Grid item xs={3}>
        <Item elevation={3}>xs=8</Item>
      </Grid>
    </Grid>
  );
}
