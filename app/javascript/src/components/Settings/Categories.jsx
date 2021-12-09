import React, { useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";

import Add from "components/Categories/Add";
import List from "components/Categories/List";
import Container from "components/Container";

import Menu from "./Menu";

const Categories = () => {
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  return (
    <Container>
      <div className="flex">
        <Menu />
        <div className="flex flex-col mx-auto pt-10 ">
          <Typography style="h2">Manage Categories</Typography>
          <Typography style="body2">
            Create and configure the categories inside your scribble.
          </Typography>
          <div className="align-left pt-5 pb-5">
            {isAddCollapsed && (
              <Button
                label="Add new category"
                icon={Plus}
                iconPosition="left"
                style="link"
                onClick={() => setIsAddCollapsed(false)}
              />
            )}
            {!isAddCollapsed && <Add setIsAddCollapsed={setIsAddCollapsed} />}
          </div>
          <List />
        </div>
      </div>
    </Container>
  );
};

export default Categories;
