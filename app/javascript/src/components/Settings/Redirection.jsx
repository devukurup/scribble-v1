import React from "react";

import Container from "components/Container";

import Menu from "./Menu";

const Redirection = () => {
  return (
    <Container>
      <div className="flex">
        <Menu />
        <div className="ml-10"></div>
      </div>
    </Container>
  );
};

export default Redirection;
