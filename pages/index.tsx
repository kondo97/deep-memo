import React, { useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Main from "components/Main";
import { signOut, useSession, Provider, signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Redirect from "./hooks/redirect"

const fetchTableData = async () => {
  const res = await axios.get("/api/hello");
  console.log(res.data);
};

fetchTableData();

const Home: NextPage = () => {
  Redirect()
  return (
    <>
      <Main />
    </>
  );
};

export default Home;
