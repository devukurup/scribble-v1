import React from "react";

import Container from "components/Container";

import Menu from "./Menu";

const index = () => {
  return (
    <Container>
      <div className="flex">
        <Menu />
        <div className="ml-10">
          <h1>Dashboard</h1>
        </div>
      </div>
    </Container>
  );
};

export default index;
