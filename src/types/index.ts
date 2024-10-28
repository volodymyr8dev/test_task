export interface User {
  id: string;
}

export type TodoStatus = "pending" | "done" | "won’t do";
export interface Todo {
  id: number;
  title: string;
  description: string;
  status?: TodoStatus;
}
