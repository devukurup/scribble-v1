import React from "react";

import Container from "components/Container";

import Menu from "./Menu";

const Settings = () => {
  return (
    <Container>
      <div className="flex">
        <Menu />
        <div className="ml-10"></div>
      </div>
    </Container>
  );
};

export default Settings;
