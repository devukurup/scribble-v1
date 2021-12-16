import React, { useEffect, useMemo, useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Tooltip } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";
import { useFilters, useTable } from "react-table";

import Delete from "components/Articles/Delete";
import { useArticle } from "contexts/articles";
import { columnList } from "utils/columnList";

import Header from "./Header";

const Table = ({ fetchArticles }) => {
  const columns = useMemo(() => columnList, []);
  const { filterStatus, filterCategory, articleList } = useArticle();
  const [filteredList, setFilteredList] = useState(articleList);
  const [isDeleteArticle, setIsDeleteArticle] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const filterTableData = () => {
    var newList = [];
    if (filterStatus !== "all") {
      newList = articleList.filter(article => article.status === filterStatus);
    } else {
      newList = articleList;
    }

    if (filterCategory.length > 0) {
      newList = newList.filter(
        ({ name }) => filterCategory.indexOf(name) !== -1
      );
    }
    setFilteredList(newList);
  };

  useEffect(() => {
    filterTableData();
  }, [filterStatus, filterCategory]);

  const rowData = filteredList.map(item => {
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
          <Link
            to={{
              pathname: `/article/${item.id}/edit`,
              state: { item },
            }}
          >
            {<i className="ri-pencil-line"></i>}
          </Link>
        </Tooltip>
      </div>
    );
    newItem.title = item.title;
    newItem.date = item.date;
    newItem.name = item.name;
    newItem.status = item.status;
    return newItem;
  });

  const data = useMemo(() => rowData, [filteredList]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  return (
    <div>
      <Header setFilter={setFilter} />
      <Typography style="body1" weight="bold">
        {filteredList.length} Articles
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
                      className="capitalize text-left text-base py-2 px-1 break-all"
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
