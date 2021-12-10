import React from "react";

import {
  Input,
  Select,
  Textarea,
  Typography,
  Dropdown,
  Button,
} from "@bigbinary/neetoui/v2";

import Container from "components/Container";

const Create = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center mx-auto mt-24 w-6/12 space-y-8">
        <div className="flex space-x-3 justify-evenly">
          <Input
            size="large"
            label={<Typography style="body2">Article Title</Typography>}
          />
          <Select
            isSearchable
            isClearable
            label={<Typography style="body2">Category</Typography>}
            name="ValueList"
            placeholder=""
            options={[
              {
                label: "Value One",
                value: "value1",
              },
              {
                label: "Value Two",
                value: "value2",
              },
              {
                label: "Value Three",
                value: "value3",
              },
              {
                label: "Value Four",
                value: "value4",
              },
              {
                label: "Value Five",
                value: "value5",
              },
            ]}
          />
        </div>

        <Textarea
          rows="10"
          error=""
          label={<Typography style="body2">Article Body</Typography>}
        />

        <div className="flex space-x-5">
          <div className="flex">
            <Button className="bg-indigo-500" label="Save Draft" />
            <Dropdown
              className="bg-indigo-500"
              buttonProps={{
                onClick: function noRefCheck() {},
              }}
              buttonStyle="text"
              position="bottom"
            >
              <li>Publish Article</li>
            </Dropdown>
          </div>
          <Button style="text" label="Cancel" />
        </div>
      </div>
    </Container>
  );
};

export default Create;
