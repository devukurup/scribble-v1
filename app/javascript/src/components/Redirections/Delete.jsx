import React from "react";

import { Warning } from "@bigbinary/neeto-icons";
import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";

import redirectionsApi from "apis/redirections";

const Delete = ({
  deleteId,
  isDeleteRedirection,
  setIsDeleteRedirection,
  fetchRedirections,
}) => {
  const handleDelete = async () => {
    try {
      const id = deleteId;
      await redirectionsApi.destroy(id);
      fetchRedirections();
      setIsDeleteRedirection(false);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <Modal
        isOpen={isDeleteRedirection}
        onClose={() => setIsDeleteRedirection(false)}
      >
        <Modal.Header>
          <div className="flex flex-col space-y-3">
            <Warning color="#f56a58" size={30} />
            <Typography style="h4">Deletion Alert</Typography>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2">
            Are you sure you want to delete this?
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-3">
          <Button label="Continue" onClick={handleDelete} />
          <Button
            label="Cancel"
            onClick={() => setIsDeleteRedirection(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Delete;
