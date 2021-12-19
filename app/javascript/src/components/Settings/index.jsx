import React, { useState, useEffect } from "react";

import { either, isEmpty, isNil } from "ramda";

import sitesApi from "apis/site";
import Container from "components/Container";

import General from "./General";
import Menu from "./Menu";

const Settings = () => {
  const [isPasswordCollapsed, setIsPasswordCollapsed] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const fetchSiteDetails = async () => {
    try {
      const response = await sitesApi.show();
      setName(response.data.site.name);
      if (!either(isNil, isEmpty)(response.data.site.password_digest)) {
        setIsPasswordCollapsed(false);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  const updateSiteDetails = async () => {
    const current_password = password ? password : null;
    await sitesApi.update({
      payload: {
        site: { name, password: current_password },
      },
    });
  };

  return (
    <Container>
      <div className="flex">
        <Menu />
        <General
          name={name}
          password={password}
          setPassword={setPassword}
          setName={setName}
          isPasswordCollapsed={isPasswordCollapsed}
          setIsPasswordCollapsed={setIsPasswordCollapsed}
          updateSiteDetails={updateSiteDetails}
          fetchSiteDetails={fetchSiteDetails}
        />
      </div>
    </Container>
  );
};

export default Settings;
