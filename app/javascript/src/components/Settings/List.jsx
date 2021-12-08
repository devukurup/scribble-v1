import React, { useState, useEffect } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

const List = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategoriesList(response.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOnDragEnd = async result => {
    try {
      await categoriesApi.update({
        id: result.draggableId,
        payload: { category: { sequence: result.destination.index + 1 } },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {provided => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {categoriesList.map(({ id, name }, index) => {
              return (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {provided => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="p-3 border-t flex space-x-2 items-center justify-between"
                    >
                      <div className="flex space-x-2">
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
                        <Button style="text" icon={Delete} />
                        <Button style="text" icon={Edit} />
                      </div>
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
  );
};

export default List;
