import React from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Input, Button, Dropdown, Checkbox } from "@bigbinary/neetoui/v2";
import { SubHeader } from "@bigbinary/neetoui/v2/layouts";

const Header = ({ setFilter }) => {
  const columnList = ["Title", "Categories", "Date", "Author", "Status"];
  return (
    <SubHeader
      actionBlock={
        <div className="flex space-x-3">
          <Input
            prefix={<Search />}
            placeholder="Search article title"
            onChange={e => setFilter("title", e.target.value)}
          />

          <Dropdown
            buttonProps={{
              size: "large",
              style: "secondary",
            }}
            label="Columns"
            // onClose={function noRefCheck(){}}
            position="bottom"
          >
            {columnList.map((item, index) => (
              <Checkbox key={index} label={item} className="p-2" />
            ))}
          </Dropdown>

          <Button
            label="Add New Article"
            className="bg-indigo-500"
            icon={Plus}
            iconPosition="right"
            to="/article/create"
          />
        </div>
      }
    />
  );
};

export default Header;
