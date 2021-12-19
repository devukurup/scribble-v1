import React from "react";

import { Typography, Input, Checkbox, Button } from "@bigbinary/neetoui/v2";

const General = ({
  name,
  password,
  setPassword,
  setName,
  isPasswordCollapsed,
  setIsPasswordCollapsed,
  updateSiteDetails,
  fetchSiteDetails,
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
          onChange={e => setName(e.target.value)}
          label={<Typography style="body3">Site Name</Typography>}
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
          onChange={() => setIsPasswordCollapsed(!isPasswordCollapsed)}
        />
        {!isPasswordCollapsed && (
          <Input
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            pattern="[A-Za-z0-9]{6,}"
          />
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
          onClick={() => fetchSiteDetails()}
          style="text"
        />
      </div>
    </div>
  );
};

export default General;
