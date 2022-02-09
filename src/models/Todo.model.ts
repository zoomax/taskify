export enum Status {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRSS",
  TODO = "TODO",
}
export enum TaskOpertaions {
  CREATED = "CREATED",
  MOVED = "MOVED",
  UPDATED = "UPDATED",
}
export interface History {
  operation: TaskOpertaions;
  from: string;
  to: string;
  at: Date;
}
export interface Payload {
  id?: string;
  history?: History;
  todo?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Todo {
  id: string;
  todo: string;
  status: Status;
  history: History[];
  createdAt: Date;
  updatedAt: Date;
}
