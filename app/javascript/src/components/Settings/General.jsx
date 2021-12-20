import React from "react";

import { Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Checkbox, Button, Input } from "@bigbinary/neetoui/v2";

const General = ({
  name,
  password,
  setName,
  isPasswordCollapsed,
  setIsPasswordCollapsed,
  updateSiteDetails,
  fetchSiteDetails,
  errorMessage,
  handleChange,
  regex,
  isPasswordMatch,
  isPasswordLength,
  setErrorMessage,
  setPassword,
}) => {
  return (
    <div className="flex flex-col mx-auto pt-10 w-3/12 space-y-8">
      <div className="flex flex-col">
        <Typography style="h2">General Settings</Typography>
        <Typography style="body3" className="text-gray-600">
          Configure general attributes of scribble.
        </Typography>
      </div>
      <div className="flex flex-col space-y-2">
        <Input
          value={name}
          onChange={e => {
            setName(e.target.value);
            if (e.target.value.length > 0) {
              setErrorMessage("");
            }
          }}
          label={<Typography style="body3">Site Name</Typography>}
          required
          error={errorMessage}
          helpText={
            <Typography style="body3">
              Customize the site name which is used to show the site name in{" "}
              <span className="font-bold">Open Graph Tags</span>
            </Typography>
          }
        />
        <hr />
        <Checkbox
          label={
            <Typography style="body3" weight="bold">
              Password Protect Knowledge Base
            </Typography>
          }
          checked={!isPasswordCollapsed}
          onChange={() => {
            setIsPasswordCollapsed(!isPasswordCollapsed);
            if (isPasswordCollapsed) {
              setPassword("");
            }
          }}
        />
        {!isPasswordCollapsed && (
          <div className="flex flex-col space-y-3">
            <Input
              label="Password"
              value={password}
              onChange={e => handleChange(e)}
              type="password"
              pattern={regex}
            />
            <div className="flex">
              {isPasswordLength && <Check color="#00ba88" size="16" />}
              {!isPasswordLength && <Close color="#f56a58" size="16" />}
              <Typography style="body3">Have at least 6 characters</Typography>
            </div>
            <div className="flex">
              {isPasswordMatch && <Check color="#00ba88" size="16" />}
              {!isPasswordMatch && <Close color="#f56a58" size="16" />}
              <Typography style="body3">
                Include at least 1 letter and 1 number
              </Typography>
            </div>
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <Button
          label="Save Changes"
          type="submit"
          onClick={() => updateSiteDetails()}
        />
        <Button
          label="Cancel"
          onClick={() => {
            fetchSiteDetails();
            setPassword("");
          }}
          style="text"
        />
      </div>
    </div>
  );
};

export default General;
