import React, { useMemo, useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Tooltip, Button, Typography, Input } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

import redirectionsApi from "apis/redirections";
import Add from "components/Redirections/Add";
import Delete from "components/Redirections/Delete";
import { columnList } from "utils/redirectionColumnList";

const Table = ({
  redirectionList,
  fetchRedirections,
  setIsAddCollapsed,
  isAddCollapsed,
}) => {
  const [isDeleteRedirection, setIsDeleteRedirection] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [editId, setEditId] = useState(0);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  var host = window.location.protocol + "//" + window.location.host;
  const columns = useMemo(() => columnList, []);

  const handleEdit = async id => {
    try {
      await redirectionsApi.update({
        id,
        payload: { redirection: { to_path: toPath, from_path: fromPath } },
      });
      fetchRedirections();
      setEditId(0);
    } catch (error) {
      logger.error(error);
    }
  };

  const rowData = redirectionList.map(item => {
    const row = {};

    if (editId === item.id) {
      row.to_path = (
        <Input
          prefix={host}
          value={toPath}
          onChange={e => setToPath(e.target.value)}
        />
      );
      row.from_path = (
        <Input
          prefix={host}
          value={fromPath}
          onChange={e => setFromPath(e.target.value)}
        />
      );
      row.edit_delete = (
        <Button icon={Check} onClick={() => handleEdit(item.id)} />
      );
    } else {
      row.to_path = (
        <Typography style="body2">{host + item.to_path}</Typography>
      );
      row.from_path = (
        <Typography style="body2">{host + item.from_path}</Typography>
      );
      row.edit_delete = (
        <div className="flex space-x-3 ">
          <Tooltip content="Delete" position="bottom">
            <Button
              label={<i className="ri-delete-bin-line"></i>}
              style="text"
              onClick={() => {
                setIsDeleteRedirection(true);
                setDeleteId(item.id);
              }}
            />
          </Tooltip>
          <Tooltip content="Edit" position="bottom">
            <Button
              label={<i className="ri-pencil-line"></i>}
              style="text"
              onClick={() => {
                setEditId(item.id);
                setFromPath(item.from_path);
                setToPath(item.to_path);
              }}
            />
          </Tooltip>
        </div>
      );
    }

    return row;
  });
  const data = useMemo(() => rowData, [rowData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <table className="w-full text-left" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index + 1} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th key={index} {...column.getHeaderProps()}>
                <Typography
                  className="text-gray-600"
                  style="body3"
                  weight="semibold"
                >
                  {" "}
                  {column.render("Header")}
                </Typography>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td
                    className="bg-white py-2 px-1"
                    key={index}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
        {!isAddCollapsed && (
          <Add
            setIsAddCollapsed={setIsAddCollapsed}
            fetchRedirections={fetchRedirections}
          />
        )}
      </tbody>
      {isDeleteRedirection && (
        <Delete
          deleteId={deleteId}
          isDeleteRedirection={isDeleteRedirection}
          setIsDeleteRedirection={setIsDeleteRedirection}
          fetchRedirections={fetchRedirections}
        />
      )}
    </table>
  );
};

export default Table;
