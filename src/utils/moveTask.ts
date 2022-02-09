import { DropResult } from "react-beautiful-dnd";
import { Todo } from "../models/Todo.model";
function moveTask(
  source: { index: number; droppableId: string },
  destination: { index: number; droppableId: string },
  draggableId: string,
  from: Todo[],
  to: Todo[],
  setFrom: React.Dispatch<React.SetStateAction<Todo[]>>,
  setTo: React.Dispatch<React.SetStateAction<Todo[]>>
): void {
  const store = to;
  const todo = { ...from[source.index] };
  const destinationTodo = { ...store[destination?.index] };
  if (destinationTodo.id) {
    store[destination?.index] = todo;
  }
  setFrom(from.filter((todo) => todo.id !== draggableId));
  setTo([...store, !destinationTodo.id ? todo : destinationTodo]);
}

export const onDragEnd = (
  event: DropResult,
  todoes: Todo[],
  setTodoes: React.Dispatch<React.SetStateAction<Todo[]>>,
  inProgressTodoes: Todo[],
  setInProgressTodoes: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodoes: Todo[],
  setCompletedTodoes: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const { draggableId, source, destination } = event;
  if (destination?.droppableId === source.droppableId) {
    if (destination?.index === source.index) return;
    if (destination?.index !== source.index) {
      let store = [];
      if (destination?.droppableId === "TodoList") {
        store = todoes;
      } else {
        store = completedTodoes;
      }
      let destinationIndexValue = store[destination?.index];
      let sourceIndexValue = store[source.index];
      store[source.index] = destinationIndexValue;
      store[destination?.index] = sourceIndexValue;
      if (destination?.droppableId === "TodoList") {
        setTodoes([...store]);
      } else {
        setCompletedTodoes([...store]);
      }
    }
  } else {
    if (destination?.droppableId === "TodoCompletedList") {
      if (source.droppableId === "TodoList") {
        moveTask(
          source,
          destination,
          draggableId,
          todoes,
          completedTodoes,
          setTodoes,
          setCompletedTodoes
        );
      } else {
        moveTask(
          source,
          destination,
          draggableId,
          inProgressTodoes,
          completedTodoes,
          setInProgressTodoes,
          setCompletedTodoes
        );
      }
    } else if (destination?.droppableId === "TodoInProgressList") {
      if (source.droppableId === "TodoList") {
        moveTask(
          source,
          destination,
          draggableId,
          todoes,
          inProgressTodoes,
          setTodoes,
          setInProgressTodoes
        );
      }
    } else if (!destination) {
      if (source.droppableId === "TodoCompletedList") {
        setCompletedTodoes(
          completedTodoes.filter((todo) => todo.id !== draggableId)
        );
      }
    }
  }
};
