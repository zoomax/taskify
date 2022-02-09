import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import InputField from "./components/InputField";
import Todoes from "./components/Todoes";
import { Todo, Status, Payload, TaskOpertaions } from "./models/Todo.model";
import  TodoesService  from "./utils/db/db";
import { createTask, getTasks } from "./store/actions";
interface Props {
  createTask: (paylaod: Payload) => any;
  getTasks: (paylaod: Todo[]) => any;
  tasks: Todo[];
}
const App: React.FC<Props> = ({ createTask, tasks, getTasks }: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [todoes, setTodoes] = useState<Todo[]>([]);
  const [completedTodoes, setCompletedTodoes] = useState<Todo[]>([]);
  const [inProgressTodoes, setInProgressTodoes] = useState<Todo[]>([]);
  const service = new TodoesService();
  const handleAddTodo: (ev: React.FormEvent) => void = (ev) => {
    ev.preventDefault();
    if (todo) {
      const task = {
        id: Date.now().toString(),
        todo,
        status: Status.TODO,
        history: {
          operation: TaskOpertaions.CREATED,
          from: Status.TODO,
          to: Status.TODO,
          at: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service
        .addTask({ ...task, history: [task.history] })
        .then((res) => {
          createTask(task);
          setTodo("");
        })
        .catch((e) => {
          console.log("somethong went wrong creating a new task");
        });
    }
  };
  const getAllTasks = async () => {
    try {
      let tasks = await service.getAllTasks();
      getTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);
  useEffect(() => {
   
    setCompletedTodoes(
      tasks.filter((task) => {
        return task.status === Status.DONE;
      })
    );
    setInProgressTodoes(
      tasks.filter((task) => {
        return task.status === Status.IN_PROGRESS;
      })
    );
    setTodoes(
      tasks.filter((task) => {
        return task.status === Status.TODO;
      })
    );
  }, [tasks]);
  return (
    <div className="App">
      <div className="heading">
        <span>Taskify</span>
      </div>
      <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
      <Todoes
        todoes={todoes}
        completedTodoes={completedTodoes}
        inProgressTodoes={inProgressTodoes}
      />
    </div>
  );
};
const mapStateToProps = (state: { tasks: Todo[] }) => {
  return {
    tasks: state.tasks,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createTask: (payload: Payload) => dispatch(createTask(payload)),
    getTasks: (payload: Todo[]) => dispatch(getTasks(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
