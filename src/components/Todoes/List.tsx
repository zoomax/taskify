import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../models/Todo.model";
import SingleTodo from "../SingleTodo ";

interface Props {
  todoes: Todo[];
  listId: string;
  title: string;
  styleClass: string;
  testId: string;
}
const List: React.FC<Props> = ({
  todoes,
  listId,
  styleClass,
  title,
  testId,
}: Props) => {
  return (
    <Droppable droppableId={listId}>
      {(provided) => {
        return (
          <div
            data-testid={testId}
            className={`todoes ${styleClass}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <span className="todoes__heading">{title}</span>
            {todoes.map((todo, index) => (
              <SingleTodo index={index} key={todo.id} todo={todo} />
            ))}
            {provided.placeholder}
            {/** keeps droppable container on its original size */}
          </div>
        );
      }}
    </Droppable>
  );
};

export default List;
