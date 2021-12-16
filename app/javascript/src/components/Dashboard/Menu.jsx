import React, { useState, useEffect, useMemo } from "react";

import { Search, Plus, Close } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";
import debounce from "lodash/debounce";

import categoriesApi from "apis/categories";
import Add from "components/Categories/Add";
import { useArticle } from "contexts/articles";
import { useCategory } from "contexts/categories";

const Menu = ({ articleData }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const { filterStatus, setFilterStatus, filterCategory, setfilterCategory } =
    useArticle();
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const { isCategoryUpdated } = useCategory();
  const [categoryList, setCategoryList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategoryList(response.data.categories);
      setFetchedCategory(response.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [isCategoryUpdated]);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  const debouncedChangeHandler = useMemo(() =>
    debounce(input => setSearchValue(input), 600)
  );

  const handleSearch = () => {
    const suggestions = fetchedCategory.filter(({ name }) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCategoryList(suggestions);
  };

  return (
    <>
      <MenuBar showMenu={true} title="Articles">
        <MenuBar.Block
          label="All"
          onClick={() => setFilterStatus("all")}
          count={articleData.all}
          active={filterStatus === "all"}
        />
        <MenuBar.Block
          label="Draft"
          onClick={() => setFilterStatus("draft")}
          count={articleData.draft}
          active={filterStatus === "draft"}
        />
        <MenuBar.Block
          label="Published"
          onClick={() => setFilterStatus("published")}
          count={articleData.published}
          active={filterStatus === "published"}
        />

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
            <Input
              prefix={<Search />}
              onChange={e => debouncedChangeHandler(e.target.value)}
            />
          </div>
        )}
        {categoryList.map(item => (
          <MenuBar.Block
            className="capitalize"
            key={item.id}
            label={item.name}
            count={item.count}
            active={filterCategory.indexOf(item.name) !== -1}
            onClick={() =>
              filterCategory.indexOf(item.name) === -1
                ? setfilterCategory([...filterCategory, item.name])
                : setfilterCategory(
                    filterCategory.filter(category => category !== item.name)
                  )
            }
          />
        ))}
      </MenuBar>
    </>
  );
};

export default Menu;
