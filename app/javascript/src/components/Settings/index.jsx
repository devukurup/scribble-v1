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
  const [errorMessage, setErrorMessage] = useState("");
  const regex = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
  const [isPasswordLength, setIsPasswordLength] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

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

  const handleChange = e => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    if (currentPassword.length >= 6) {
      setIsPasswordLength(true);
    } else {
      setIsPasswordLength(false);
    }

    if (currentPassword.match(regex)) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const updateSiteDetails = async () => {
    if (either(isNil, isEmpty)(name)) {
      setErrorMessage("Site Name is required");
    } else if (
      !(!isPasswordCollapsed && (!isPasswordLength || !isPasswordMatch))
    ) {
      const currentPassword = password ? password : null;
      await sitesApi.update({
        payload: {
          site: { name, password: currentPassword },
        },
      });
    }
  };

  return (
    <Container>
      <div className="flex">
        <Menu />
        <General
          name={name}
          password={password}
          setName={setName}
          isPasswordCollapsed={isPasswordCollapsed}
          setIsPasswordCollapsed={setIsPasswordCollapsed}
          updateSiteDetails={updateSiteDetails}
          fetchSiteDetails={fetchSiteDetails}
          errorMessage={errorMessage}
          handleChange={handleChange}
          regex={regex}
          isPasswordMatch={isPasswordMatch}
          isPasswordLength={isPasswordLength}
          setPassword={setPassword}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </Container>
  );
};

export default Settings;
