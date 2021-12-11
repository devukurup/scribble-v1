import React from "react";

import { Warning } from "@bigbinary/neeto-icons";
import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";

import articlesApi from "apis/articles";

const Delete = ({
  deleteData,
  isDeleteArticle,
  setIsDeleteArticle,
  fetchArticles,
}) => {
  const handleDelete = async () => {
    const id = deleteData.id;
    try {
      await articlesApi.destroy(id);
      fetchArticles();
      setIsDeleteArticle(false);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <Modal isOpen={isDeleteArticle} onClose={() => setIsDeleteArticle(false)}>
        <Modal.Header>
          <div className="flex flex-col space-y-3">
            <Warning color="#f56a58" size={30} />
            <Typography style="h4">Deletion Alert</Typography>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2">
            Are you sure you want to delete{" "}
            <span className="capitalize font-bold">{deleteData.title}</span> ?
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-3">
          <Button label="Continue" onClick={handleDelete} />
          <Button label="Cancel" onClick={() => setIsDeleteArticle(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Delete;
