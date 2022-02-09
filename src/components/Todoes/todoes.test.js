import {
  queryAllByTestId,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import "fake-indexeddb";
import List from "./List";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { TaskReducer } from "../../store/reducer";
import React from "react";
import store from "../../store/index";
// import { DragDropContext } from "react-beautiful-dnd";
import { Status, TaskOpertaions } from "../../models/Todo.model";
import App from "../../App";
const todoes = [];
const inProgressTodoes = [];
const renderWithRedux = (
  component,
  { state, store = createStore(combineReducers({ tasks: TaskReducer })) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("drag and drop tasks", () => {
  it("drag from todo-list to inprogress list", () => {
    const { queryByTestId } = renderWithRedux(<App />);
    const inProgress = queryByTestId("inprogress-list");
    const todoTask =
      queryByTestId("todo-list").querySelectorAll(".todoes__single");
    if (todoTask.length > 0) {
      fireEvent.dragStart(todoTask);
      fireEvent.dragEnter(inProgress);
      fireEvent.dragOver(inProgress);
      fireEvent.drop(inProgress);
    }

    expect(inProgress.querySelectorAll(".todoes__single").length).toBe(0);
  });
});
