import React from "react";
import { Payload, Status, TaskOpertaions, Todo } from "../../models/Todo.model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./styles.css";
import List from "./List";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../../store/actions";
import TodoesService from "../../utils/db/db";
interface Props {
  todoes: Todo[];
  inProgressTodoes: Todo[];
  completedTodoes: Todo[];
  updateTask: (payload: Payload) => any;
  deleteTask: (payload: Payload) => any;
  tasks: Todo[];
}
const Todoes: React.FC<Props> = ({
  todoes,
  inProgressTodoes,
  completedTodoes,
  updateTask,
  deleteTask,
  tasks,
}) => {
  const service = new TodoesService();
  const moveTask = (
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
      })
      .catch((e) => {
        console.log(e);
        console.log("something went wrong moving your task");
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
  return (
    <DragDropContext
      onDragEnd={(e: DropResult) => {
        const { source, destination, draggableId } = e;
        let task: Todo = tasks.find((task) => task.id === draggableId) as Todo;
        if (destination?.droppableId === "TodoCompletedList") {
          if (source.droppableId === "TodoList") {
            let payload = {
              id: draggableId,
              history: {
                operation: TaskOpertaions.MOVED,
                from: Status.TODO,
                to: Status.DONE,
                at: new Date(),
              },
              status: Status.DONE,
              updatedAt: new Date(),
            };
            moveTask(payload, task, updateTask);
          } else {
            let payload = {
              id: draggableId,
              history: {
                operation: TaskOpertaions.MOVED,
                from: Status.IN_PROGRESS,
                to: Status.DONE,
                at: new Date(),
              },
              status: Status.DONE,
              updatedAt: new Date(),
            };
            moveTask(payload, task, updateTask);
          }
        } else if (destination?.droppableId === "TodoInProgressList") {
          if (source.droppableId === "TodoList") {
            let payload = {
              id: draggableId,
              history: {
                operation: TaskOpertaions.MOVED,
                from: Status.TODO,
                to: Status.IN_PROGRESS,
                at: new Date(),
              },
              status: Status.IN_PROGRESS,
              updatedAt: new Date(),
            };
            moveTask(payload, task, updateTask);
          }
        } else if (!destination) {
          if (source.droppableId === "TodoCompletedList") {
            removeTask(draggableId);
          }
        }
      }}
    >
      <div className="container">
        <List
          listId={"TodoList"}
          todoes={todoes}
          title={"Active Tasks"}
          styleClass={""}
          testId={"todo-list"}
        />
        <List
          listId={"TodoInProgressList"}
          todoes={inProgressTodoes}
          title={"In Progress Tasks"}
          styleClass={"inProgress"}
          testId={"inprogress-list"}
        />
        <List
          listId={"TodoCompletedList"}
          todoes={completedTodoes}
          title={"Completed Tasks"}
          styleClass={"remove"}
          testId={"completed-list"}
        />
      </div>
    </DragDropContext>
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
export default connect(mapStateToProps, mapDispatchToProps)(Todoes);
