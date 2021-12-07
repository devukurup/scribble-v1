import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

const Add = ({ setIsAddCollapsed }) => {
  const [name, setName] = useState("");
  const handleSave = async () => {
    setIsAddCollapsed(true);
    try {
      await categoriesApi.create({ category: { name } });
    } catch (error) {
      logger.error(error);
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
