import React from "react";

import Menu from "./Menu";

import Container from "../Container";

const index = () => {
  return (
    <Container>
      <div className="flex">
        <Menu />
        <div className="ml-10"></div>
      </div>
    </Container>
  );
};

export default index;
