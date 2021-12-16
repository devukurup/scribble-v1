import React from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Input, Button, Dropdown, Checkbox } from "@bigbinary/neetoui/v2";
import { SubHeader } from "@bigbinary/neetoui/v2/layouts";

const Header = ({ setFilter, allColumns }) => {
  allColumns = allColumns.filter(column => column.Header !== "");
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
            position="bottom"
          >
            <div className="flex flex-col space-y-2">
              {allColumns.map(column => (
                <Checkbox
                  key={column.id}
                  label={column.Header}
                  {...column.getToggleHiddenProps()}
                />
              ))}
            </div>
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
