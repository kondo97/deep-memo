import React, { useState } from "react";
import ArrowTop from "components/ArrowTop";
import Redirect from "pages/hooks/redirect";
import Create from "components/Create";

const CreatePage = () => {
  Redirect();
  return (
    <>
      <ArrowTop />
      <Create editFlag={false} />
    </>
  );
};

export default CreatePage;
