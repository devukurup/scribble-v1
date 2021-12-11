import React, { useEffect, useMemo, useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Tooltip } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

import articlesApi from "apis/articles";
import Delete from "components/Articles/Delete";
import { columnList } from "utils/columnList";

const Table = () => {
  const columns = useMemo(() => columnList, []);

  const [articleList, setArticleList] = useState([]);
  const [isDeleteArticle, setIsDeleteArticle] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.tableData();
      setArticleList(response.data.articles);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  const rowData = articleList.map(item => {
    const newItem = {};
    newItem.userName = `${item.first_name} ${item.last_name}`;
    newItem.edit_delete = (
      <div className="flex space-x-3 justify-end">
        <Tooltip content="Delete" position="bottom">
          <Button
            label={<i className="ri-delete-bin-line"></i>}
            onClick={() => {
              setIsDeleteArticle(true);
              setDeleteData({ ...item });
            }}
            style="text"
          />
        </Tooltip>
        <Tooltip content="Edit" position="bottom">
          <Link to="/">{<i className="ri-pencil-line"></i>}</Link>
        </Tooltip>
      </div>
    );
    newItem.title = (
      <Typography weight="medium" className="text-indigo-500">
        {item.title}
      </Typography>
    );
    newItem.date = item.date;
    newItem.name = item.name;
    newItem.status = item.status;
    return newItem;
  });

  const data = useMemo(() => rowData, [articleList]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div>
      <Typography style="body1" weight="bold">
        67 Articles
      </Typography>
      <table {...getTableProps()} className="min-w-full">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index + 1} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  className="text-gray-600 py-6 font-medium text-left text-xs"
                  key={index}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                key={i}
                {...row.getRowProps()}
                className="p-2 odd:bg-white even:bg-gray-100"
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      className="capitalize text-left text-base py-2 px-1 "
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
        </tbody>
      </table>
      {isDeleteArticle && (
        <Delete
          deleteData={deleteData}
          setIsDeleteArticle={setIsDeleteArticle}
          fetchArticles={fetchArticles}
          isDeleteArticle={isDeleteArticle}
        />
      )}
    </div>
  );
};

export default Table;
