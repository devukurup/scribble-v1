import React from "react";

import { Warning } from "@bigbinary/neeto-icons";
import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

const Delete = ({
  name,
  setDeleteCategory,
  deleteCategory,
  fetchCategories,
  id,
}) => {
  const handleDelete = async () => {
    try {
      await categoriesApi.destroy(id);
      fetchCategories();
      setDeleteCategory(0);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <Modal isOpen={deleteCategory} onClose={() => setDeleteCategory(0)}>
        <Modal.Header>
          <div className="flex flex-col space-y-3">
            <Warning color="#f56a58" size={30} />
            <Typography style="h4">Deletion Alert</Typography>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{name}</span> ?
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-3">
          <Button label="Continue" onClick={handleDelete} />
          <Button label="Cancel" onClick={() => setDeleteCategory(0)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Delete;
