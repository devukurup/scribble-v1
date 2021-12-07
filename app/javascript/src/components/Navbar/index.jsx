import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { NavLink } from "react-router-dom";

const index = () => {
  return (
    <Header
      className="px-4 border"
      actionBlock={
        <Button label="Preview" icon={ExternalLink} style="secondary" />
      }
      title={
        <div className="flex space-x-5">
          <Typography className="cursor-pointer" style="body1" weight="bold">
            Scribble
          </Typography>
          <NavLink to="/">
            <Typography className="text-link-inactive">Articles</Typography>
          </NavLink>
          <NavLink to="/settings">
            <Typography className="text-link-inactive">Settings</Typography>
          </NavLink>
        </div>
      }
    />
  );
};

export default index;
