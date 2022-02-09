import React, { useEffect, useMemo, useRef, useState } from "react";
import { Payload, TaskOpertaions, Todo } from "../../models/Todo.model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import "./styles.css";
import { deleteTask, updateTask } from "../../store/actions";
import { connect } from "react-redux";
import TodoesService from "../../utils/db/db";
interface Props {
  todo: Todo;
  index: number;
  updateTask: (payload: Payload) => any;
  deleteTask: (payload: Payload) => any;
  tasks: Todo[];
}
const SingleTodo: React.FC<Props> = ({
  todo,
  index,
  updateTask,
  deleteTask,
  tasks,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const service = new TodoesService();
  const editTask = (
    payload: Payload,
    task: Todo,
    updateTask: (payload: Payload) => any
  ) => {
    service
      .updateTask({
        ...task,
        ...payload,
        history: payload?.history
          ? [...task.history, payload?.history]
          : task.history,
      })
      .then(() => {
        updateTask(payload);
        setIsEditMode(false);
      })
      .catch((e) => {
        console.log(e);
        console.log("something went wrong updating your task");
      });
  };
  const removeTask = (id: string) => {
    service
      .deleteTask(id)
      .then(() => {
        deleteTask({ id });
      })
      .catch((e) => {
        console.log(e);
        console.log("something went wrong removing task");
      });
  };

  const handleDelete = (id: string) => {
    removeTask(id);
  };

  const handleEdit = (id: string) => {
    let task = tasks.find((task) => task.id === id) as Todo;
    let payload = {
      id,
      todo: editTodo,
      history: {
        operation: TaskOpertaions.UPDATED,
        from: todo.history[todo.history.length - 1].from,
        to: todo.history[todo.history.length - 1].to,
        at: new Date(),
      },
    };
    editTask(payload, task, updateTask);
  };
  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus();
    }
  }, [isEditMode]);

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => {
        return (
          <form
            data-testid="task"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              if (editTodo !== "") {
                handleEdit(todo.id);
              }
            }}
            className="todoes__single"
          >
            {isEditMode ? (
              <input
                type="text"
                value={editTodo}
                className="todoes__single--text"
                onChange={(e) => {
                  setEditTodo(e.target.value);
                }}
                ref={inputRef}
              />
            ) : (
              <span className="todoes__single--text">{todo.todo}</span>
            )}
            <div>
              <span
                className="icon"
                onClick={() => {
                  setIsEditMode(!isEditMode);
                }}
              >
                <AiFillEdit />
              </span>
              <span onClick={() => handleDelete(todo.id)} className="icon">
                <AiFillDelete />
              </span>
            </div>
          </form>
        );
      }}
    </Draggable>
  );
};
const mapStateToProps = (state: { tasks: Todo[] }) => {
  return {
    tasks: state.tasks,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTask: (payload: Payload) => dispatch(updateTask(payload)),
    deleteTask: (payload: Payload) => dispatch(deleteTask(payload)),
  };
};
export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(SingleTodo)
);
