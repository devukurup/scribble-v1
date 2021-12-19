import React from "react";

import { Settings, Repeat, Seo } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className=" flex flex-col border-r-2 w-1/4 h-screen space-y-4 p-2">
      <NavLink to="/settings">
        <div className="flex p-3 space-x-2">
          <div>
            <Settings size={28} color="#9CA3AF" />
          </div>
          <div className="flex flex-col">
            <div>
              <Typography weight="semibold">General</Typography>
            </div>
            <div>
              <Typography style="body3">
                Page Title, Brand Name & Meta Description
              </Typography>
            </div>
          </div>
        </div>
      </NavLink>

      <NavLink to="/settings/redirection">
        <div className="flex p-3 space-x-2">
          <div>
            <Repeat size={28} color="#9CA3AF" />
          </div>
          <div className="flex flex-col">
            <div>
              <Typography weight="semibold">Redirections</Typography>
            </div>
            <div>
              <Typography style="body3">
                Create & configure redirection rules
              </Typography>
            </div>
          </div>
        </div>
      </NavLink>

      <NavLink to="/settings/categories">
        <div className="flex p-3 space-x-2">
          <div>
            <Seo size={28} color="#9CA3AF" />
          </div>
          <div className="flex flex-col">
            <div>
              <Typography weight="semibold">Manage categories</Typography>
            </div>
            <div>
              <Typography style="body3">
                Edit and Reorder KB Structure
              </Typography>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Menu;
