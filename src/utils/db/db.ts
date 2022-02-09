import { Todo } from "../../models/Todo.model";
import { DBSchema, openDB } from "idb";

interface TasksDB extends DBSchema {
  todoes: { key: string; value: Todo };
}
export default class TodoesService {
  private async connect() {
    return await openDB<TasksDB>("tasks", 1, {
      upgrade(db) {
        db.createObjectStore("todoes", { keyPath: "id" });
      },
    });
  }

  async getAllTasks() {
    let tx = (await this.connect()).transaction("todoes", "readonly");
    let store = tx.objectStore("todoes");
    return await store.getAll();
  }
  async addTask(task: Todo) {
    let tx = (await this.connect()).transaction("todoes", "readwrite");
    tx.onerror = () => {
      tx.abort();
    };

    let store = tx.objectStore("todoes");
    return await store.add(task);
  }
  async updateTask(task: Todo) {
    let tx = (await this.connect()).transaction("todoes", "readwrite");
    let store = tx.objectStore("todoes");
    return await store.put(task);
  }
  async deleteTask(id: string) {
    let tx = (await this.connect()).transaction("todoes", "readwrite");
    let store = tx.objectStore("todoes");
    return await store.delete(id);
  }
}
