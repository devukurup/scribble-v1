import React, { useState } from "react";

import PropTypes from "prop-types";

const CategoryContext = React.createContext();

const CategoryProvider = ({ children }) => {
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const initialValues = {
    isCategoryUpdated,
    setIsCategoryUpdated,
  };
  return (
    <CategoryContext.Provider value={initialValues}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  const context = React.useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
};

CategoryProvider.proptypes = {
  children: PropTypes.node,
};

export { CategoryProvider, useCategory };
