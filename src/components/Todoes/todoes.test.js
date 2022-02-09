import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { TaskReducer } from "../../store/reducer";
import App from "../../App";
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
