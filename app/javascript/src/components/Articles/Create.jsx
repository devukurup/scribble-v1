import React, { useEffect, useState } from "react";

import { useHistory } from "react-router";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import DataForm from "./Form";

const Create = () => {
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([]);

  const [status, setStatus] = useState("Save Draft");

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
  }, []);

  const initialValues = {
    title: "",
    content: "",
    category: "",
  };

  const handleSubmit = async data => {
    const category_id = data.category.value;
    const title = data.title;
    const content = data.content;
    const optedStatus = status === "Save Draft" ? "draft" : "published";
    try {
      await articlesApi.create({
        article: { title, content, status: optedStatus, category_id },
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

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

export default Create;
