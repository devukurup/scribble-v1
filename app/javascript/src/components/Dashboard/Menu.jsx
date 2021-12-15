import React, { useState, useEffect } from "react";

import { Search, Plus, Close } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import categoriesApi from "apis/categories";
import Add from "components/Categories/Add";
import { useCategory } from "contexts/categories";

const Menu = ({ articleData }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const { isCategoryUpdated } = useCategory();
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategoryList(response.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [isCategoryUpdated]);

  return (
    <>
      <MenuBar showMenu={true} title="Articles">
        <MenuBar.Block label="All" count={articleData.all} active />
        <MenuBar.Block label="Draft" count={articleData.draft} />
        <MenuBar.Block label="Published" count={articleData.published} />

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
            <Add setIsAddCollapsed={setIsAddCollapsed} />
          </div>
        )}
        {!isSearchCollapsed && (
          <div className="p-2">
            <Input prefix={<Search />} />
          </div>
        )}
        {categoryList.map(item => (
          <MenuBar.Block
            className="capitalize"
            key={item.id}
            label={item.name}
            count={item.count}
          />
        ))}
      </MenuBar>
    </>
  );
};

export default Menu;
