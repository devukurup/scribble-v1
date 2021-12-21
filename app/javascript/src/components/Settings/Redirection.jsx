import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";

import redirectionsApi from "apis/redirections";
import Container from "components/Container";
import Table from "components/Redirections/Table";

import Menu from "./Menu";

const Redirection = () => {
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const [redirectionList, setRedirectionList] = useState([]);
  const fetchRedirections = async () => {
    try {
      const response = await redirectionsApi.list();
      setRedirectionList(response.data.redirections);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  return (
    <Container>
      <div className="flex">
        <Menu />
        <div className="flex flex-col mx-auto pt-10 w-7/12 space-y-10">
          <div className="flex flex-col">
            <Typography style="h2">Redirections</Typography>
            <Typography style="body3">
              Create and configure redirection rules to send users from old
              links to new links. All redirections are performed with 301 status
              codes to be SEO friendly.
            </Typography>
          </div>
          <div className="bg-blue-100 p-10">
            <Table
              redirectionList={redirectionList}
              fetchRedirections={fetchRedirections}
              isAddCollapsed={isAddCollapsed}
              setIsAddCollapsed={setIsAddCollapsed}
            />
            {isAddCollapsed && (
              <Button
                label="Add new Redirection"
                icon={Plus}
                iconPosition="left"
                style="link"
                onClick={() => setIsAddCollapsed(false)}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Redirection;
