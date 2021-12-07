import React, { useState } from "react";

import { Search, Plus, Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

const Menu = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  return (
    <>
      <MenuBar showMenu={true} title="Articles">
        <MenuBar.Block label="All" count={13} active />
        <MenuBar.Block label="Draft" count={2} />
        <MenuBar.Block label="Published" count={7} />

        <MenuBar.SubTitle
          iconProps={[
            {
              icon: isSearchCollapsed ? Search : Close,
              onClick: () => {
                setIsSearchCollapsed(!isSearchCollapsed);
                setIsAddCollapsed(true);
              },
            },
            {
              icon: isAddCollapsed ? Plus : Close,
              onClick: () => {
                setIsAddCollapsed(!isAddCollapsed);
                setIsSearchCollapsed(true);
              },
            },
          ]}
        >
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            CATEGORIES
          </Typography>
        </MenuBar.SubTitle>

        {!isAddCollapsed && (
          <div className="p-2">
            <Input suffix={<Check />} />
          </div>
        )}
        {!isSearchCollapsed && (
          <div className="p-2">
            <Input prefix={<Search />} />
          </div>
        )}

        <MenuBar.Block label="Europe" count={80} />
        <MenuBar.Block label="Middle-East" count={60} />
        <MenuBar.Block label="Asia" count={60} />
      </MenuBar>
    </>
  );
};

export default Menu;
