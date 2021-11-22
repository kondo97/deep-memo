import React from "react";
import Login from 'components/Login'
import ArrowTop from "components/ArrowTop";

const NewLogin = () => {
  return (
    <>
      <ArrowTop />
      <Login name={'ログイン'} />
    </>
  );
};

export default NewLogin;