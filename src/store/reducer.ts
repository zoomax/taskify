import { Payload, Todo } from "../models/Todo.model";
import { TaskActionTypes } from "./types";
interface Action {
  type: TaskActionTypes;
  payload: Payload | Todo[];
}

export const TaskReducer = (state: Todo[] = [], { type, payload }: Action) => {
  let payloadObject = payload as Payload;
  switch (type) {
    case TaskActionTypes.GET_TASKS:
      return [...(payload as Todo[])];

    case TaskActionTypes.CREATE_TASK:
      let newState: Todo[] = [
        ...state,
        { ...payloadObject, history: [payloadObject?.history] } as Todo,
      ];
      return newState;

    case TaskActionTypes.UPDATE_TASK:
      return [
        ...state.map((task: Todo) => {
          if (!!payloadObject?.id) {
            if (task.id === payloadObject.id) {
              return {
                ...task,
                ...payloadObject,
                history: payloadObject?.history
                  ? [...task.history, payloadObject?.history]
                  : [...task.history],
              };
            }
          }
          return task;
        }),
      ];

    case TaskActionTypes.DELETE_TASK:
      return state.filter((task: Todo) => {
        if (!!payloadObject?.id) {
          if (task.id !== payloadObject.id) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      });
    default:
      return state;
  }
};
