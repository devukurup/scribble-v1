import React, { useState } from "react";

import PropTypes from "prop-types";

const ArticleContext = React.createContext();

const ArticleProvider = ({ children }) => {
  const [articleList, setArticleList] = useState([]);
  const initialValues = {
    articleList,
    setArticleList,
  };
  return (
    <ArticleContext.Provider value={initialValues}>
      {children}
    </ArticleContext.Provider>
  );
};

const useArticle = () => {
  const context = React.useContext(ArticleContext);
  if (context === undefined) {
    throw new Error("useArticle must be used within ArticleProvider");
  }

  return context;
};

ArticleProvider.proptypes = {
  children: PropTypes.node,
};

export { ArticleProvider, useArticle };
