import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";
import { either, isEmpty, isNil } from "ramda";

import categoriesApi from "apis/categories";

import { useCategory } from "../../contexts/categories";

const Add = ({ setIsAddCollapsed }) => {
  const [name, setName] = useState("");
  const { setIsCategoryUpdated, isCategoryUpdated } = useCategory();
  const handleSave = async () => {
    setIsAddCollapsed(true);
    if (!either(isNil, isEmpty)(name)) {
      try {
        await categoriesApi.create({ category: { name } });
        setIsCategoryUpdated(!isCategoryUpdated);
      } catch (error) {
        logger.error(error);
      }
    }
  };

  return (
    <>
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        suffix={<Check onClick={handleSave} />}
      />
    </>
  );
};

export default Add;
