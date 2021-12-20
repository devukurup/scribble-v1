import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import Container from "components/Container";

import Menu from "./Menu";

const Redirection = () => {
  return (
    <Container>
      <div className="flex">
        <Menu />
        <div className="flex flex-col mx-auto pt-10 w-4/12 space-y-2">
          <Typography style="h2">Redirections</Typography>
          <Typography style="body3">
            Create and configure redirection rules to send users from old links
            to new links. All redirections are performed with 301 status codes
            to be SEO friendly.
          </Typography>
          <div className="bg-blue-300"></div>
        </div>
      </div>
    </Container>
  );
};

export default Redirection;
