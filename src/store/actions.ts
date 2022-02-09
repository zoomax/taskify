import { TaskActionTypes } from "./types";
import { Payload, Todo } from "../models/Todo.model";

export const createTask = (payload: Payload) => {
  return {
    payload,
    type: TaskActionTypes.CREATE_TASK,
  };
};

export const updateTask = (payload: Payload) => {
  return {
    payload,
    type: TaskActionTypes.UPDATE_TASK,
  };
};

export const deleteTask = (payload: Payload) => {
  return {
    payload,
    type: TaskActionTypes.DELETE_TASK,
  };
};
export const getTasks = (payload: Todo[]) => {
  return {
    payload,
    type: TaskActionTypes.GET_TASKS,
  };
};
