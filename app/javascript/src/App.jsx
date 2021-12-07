import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Main from "components/Main";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="py-10">
        <PageLoader />
      </div>
    );
  }

  return <Main />;
};

export default App;
