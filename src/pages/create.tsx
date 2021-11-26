import React, { useState } from 'react';
import ArrowTop from 'src/components/ArrowTop';
import Create from 'src/components/Create';
import Redirect from 'src/pages/hooks/useRedirect';

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
