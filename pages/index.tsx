import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import axios from "axios";
import Main from "components/Main";

const fetchTableData = async () => {
  const res = await axios.get("/api/hello");
  console.log(res.data);
};

fetchTableData();

const Home: NextPage = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

export default Home;
