import React from "react";

import { Typography, Dropdown, Button } from "@bigbinary/neetoui/v2";
import { Input, Textarea, Select } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Container from "components/Container";

const DataForm = ({
  categoryList,
  initialValues,
  handleSubmit,
  status,
  setStatus,
}) => {
  const statusList = ["Save Draft", "Publish"];
  var selectedCategory = categoryList.find(
    cat => cat.name === initialValues.category
  );
  selectedCategory = {
    label: (
      <Typography style="body2" textTransform="capitalize">
        {selectedCategory?.name}
      </Typography>
    ),
    value: selectedCategory?.id,
  };

  const getStatus = () => {
    return status === statusList[0] ? statusList[1] : statusList[0];
  };

  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.string().trim().required("Required"),
      content: Yup.string()
        .trim()
        .required("Required")
        .min(10, "More content is required"),
    });
  };
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col justify-center mx-auto mt-24 w-6/12 space-y-8">
            <div className="flex space-x-3 justify-evenly">
              <Input
                name="title"
                size="large"
                label={<Typography style="body2">Article Title</Typography>}
              />
              <Select
                isSearchable
                defaultValue={selectedCategory ? selectedCategory : ""}
                label={<Typography style="body2">Category</Typography>}
                name="category"
                options={categoryList.map(item => {
                  var newItem = {};
                  newItem.label = (
                    <Typography style="body2" textTransform="capitalize">
                      {item.name}
                    </Typography>
                  );
                  newItem.value = item.id;
                  return newItem;
                })}
              />
            </div>
            <Textarea
              rows="10"
              name="content"
              label={<Typography style="body2">Article Body</Typography>}
            />
            <div className="flex space-x-5">
              <div className="flex">
                <Button
                  className="bg-indigo-500"
                  label={status}
                  type="submit"
                />
                <Dropdown
                  className="bg-indigo-500"
                  buttonStyle="text"
                  position="bottom-end"
                >
                  <li
                    onClick={() => setStatus(getStatus())}
                    className="bg-indigo-500 text-white "
                  >
                    {getStatus()}
                  </li>
                </Dropdown>
              </div>
              <Button style="text" label="Cancel" to="/" />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default DataForm;
