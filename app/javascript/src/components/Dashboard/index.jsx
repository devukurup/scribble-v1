import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import articlesApi from "apis/articles";
import Container from "components/Container";
import { useArticle } from "contexts/articles";

import Header from "./Header";
import Menu from "./Menu";
import Table from "./Table";

const Dashboard = () => {
  const [articleData, setArticleData] = useState({});
  const { setArticleList } = useArticle();
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticleData(response.data);
      setArticleList(response.data.articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto pt-48">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex">
        <div>
          <Menu articleData={articleData} />
        </div>
        <div className="flex flex-col mx-10 mt-5 w-full">
          <Header />
          <Table fetchArticles={fetchArticles} />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
