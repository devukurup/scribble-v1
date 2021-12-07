import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import Menu from "./Menu";

import Container from "../Container";

const Categories = () => {
  return (
    <Container>
      <div className="flex">
        <Menu />
        <div className="flex flex-col mx-auto pt-10 ">
          <Typography style="h3">Manage Categories</Typography>
          <Typography style="body3">
            Create and configure the categories inside your scribble.
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default Categories;
