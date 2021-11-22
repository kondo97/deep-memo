import React from "react";
import type { NextPage } from "next";
import axios from "axios";
import Main from "components/Main";

const fetchTableData = async () => {
  const res = await axios.get("/api/hello");
  console.log(res.data);
};

fetchTableData();

const Home: NextPage = () => {
  return (
    <>
      <Main />
    </>
  );
};

export default Home;
