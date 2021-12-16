import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import DataForm from "./Form";

const Edit = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { state } = useLocation();
  const { item } = state;

  const [categoryList, setCategoryList] = useState([]);

  const [status, setStatus] = useState(
    item.status === "draft" ? "Save Draft" : "Publish"
  );

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategoryList(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const initialValues = {
    title: item.title,
    content: item.content,
    category: item.name,
  };

  const handleSubmit = async data => {
    const category_id = data.category.value;
    const title = data.title;
    const content = data.content;
    const optedStatus = status === "Save Draft" ? "draft" : "published";
    try {
      await articlesApi.update({
        id: item.id,
        payload: {
          article: { title, content, status: optedStatus, category_id },
        },
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) {
    return (
      <div className="py-10">
        <PageLoader />
      </div>
    );
  }

  return (
    <DataForm
      categoryList={categoryList}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      status={status}
      setStatus={setStatus}
    />
  );
};

export default Edit;
