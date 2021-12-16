import React, { useState, useEffect } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Typography, Button, Input } from "@bigbinary/neetoui/v2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";
import { useCategory } from "contexts/categories";

import Delete from "./Delete";

const List = () => {
  const [categoryList, setCategoryList] = useState([]);
  const { isCategoryUpdated } = useCategory();
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(0);
  const [deleteCategory, setDeleteCategory] = useState(0);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategoryList(response.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [isCategoryUpdated]);

  const categoryUpdate = async payload => {
    try {
      await categoriesApi.update(payload);
      fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleEdit = id => {
    setEditId(0);
    categoryUpdate({
      id,
      payload: { category: { name: title } },
    });
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    const items = Array.from(categoryList);
    const reorderedItem = items.splice(Number(result.source.index), 1);
    items.splice(Number(result.destination.index), 0, ...reorderedItem);
    setCategoryList(items);
    categoryUpdate({
      id: result.draggableId,
      payload: { category: { sequence: result.destination.index + 1 } },
    });
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {categoryList.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={String(id)} index={index}>
                    {provided => (
                      <li
                        key={id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {editId !== id && (
                          <div className="p-3 border-t flex space-x-2 items-center justify-between">
                            <div className="flex space-x-2 items-center">
                              <i className="ri-drag-move-2-line text-sm text-gray-500"></i>
                              <Typography
                                size="body2"
                                textTransform="capitalize"
                                weight="medium"
                              >
                                {name}
                              </Typography>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                style="text"
                                label={<i className="ri-delete-bin-line"></i>}
                                onClick={() => setDeleteCategory(id)}
                              />
                              {deleteCategory === id && (
                                <Delete
                                  name={name}
                                  setDeleteCategory={setDeleteCategory}
                                  deleteCategory={deleteCategory}
                                  fetchCategories={fetchCategories}
                                  id={id}
                                />
                              )}
                              <Button
                                style="text"
                                label={<i className="ri-pencil-line"></i>}
                                onClick={() => {
                                  setEditId(id);
                                  setTitle(name);
                                }}
                              />
                            </div>{" "}
                          </div>
                        )}
                        {editId === id && (
                          <div className="p-3 border-t">
                            <Input
                              value={title}
                              onChange={e => setTitle(e.target.value)}
                              suffix={<Check onClick={() => handleEdit(id)} />}
                            />
                          </div>
                        )}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default List;
