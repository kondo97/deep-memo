import React, { useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Main from "components/Main";
import { signOut, useSession, Provider, signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

const fetchTableData = async () => {
  const res = await axios.get("/api/hello");
  console.log(res.data);
};

fetchTableData();

const Home: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const redirectPage = () => {
    if (!session && !loading) {
      router.push("login");
    }
  };
  
  useEffect(() => {
    redirectPage();
  });
  return (
    <>
      <Main />
    </>
  );
};

export default Home;
