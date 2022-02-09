import { Status, TaskOpertaions, Todo } from "../models/Todo.model";
import "idb";
import "fake-indexeddb/auto";
const data: Todo[] = [
  {
    id: Date.now().toString(),
    todo: "wash dishes",
    status: Status.IN_PROGRESS,
    history: [
      {
        operation: TaskOpertaions.MOVED,
        from: Status.TODO,
        to: Status.IN_PROGRESS,
        at: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: Date.now().toString(),
    todo: "wash dishes",
    status: Status.TODO,
    history: [
      {
        operation: TaskOpertaions.CREATED,
        from: Status.TODO,
        to: Status.TODO,
        at: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default {
  openDB: jest.fn(),
  updateTask: jest.fn().mockRejectedValue(""),
  deleteTask: jest.fn().mockRejectedValue(""),
  addTask: jest.fn().mockRejectedValue(""),
};
