import React from "react";

import Container from "components/Container";

import Header from "./Header";
import Menu from "./Menu";
import Table from "./Table";

const index = () => {
  return (
    <Container>
      <div className="flex">
        <div>
          <Menu />
        </div>
        <div className="mx-10 mt-5">
          <Header />
          <Table />
        </div>
      </div>
    </Container>
  );
};

export default index;
