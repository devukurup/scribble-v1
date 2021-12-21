import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input, Button } from "@bigbinary/neetoui/v2";
import { either, isEmpty, isNil } from "ramda";

import redirectionsApi from "apis/redirections";

const Add = ({ fetchRedirections, setIsAddCollapsed }) => {
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  var host = window.location.protocol + "//" + window.location.host;
  const handleSave = async () => {
    if (!either(isNil, isEmpty)(fromPath) && !either(isNil, isEmpty)(toPath)) {
      try {
        await redirectionsApi.create({
          redirection: {
            from_path: fromPath,
            to_path: toPath,
          },
        });
        fetchRedirections();
      } catch (error) {
        logger.error(error);
      }
    }
    setIsAddCollapsed(true);
  };
  return (
    <tr>
      <td>
        <Input
          prefix={host}
          value={fromPath}
          onChange={e => setFromPath(e.target.value)}
        />
      </td>
      <td>
        <Input
          prefix={host}
          value={toPath}
          onChange={e => setToPath(e.target.value)}
        />
      </td>
      <td>
        <Button prefix={host} icon={Check} onClick={() => handleSave()} />
      </td>
    </tr>
  );
};

export default Add;
