import api from "../utils/axiosInstance";
import { Todo, TodoStatus } from "../types";
export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await api.get("/todo");
  return res.data;
};

export const createTodo = async (
  title: string,
  description: string
): Promise<Todo> => {
  const res = await api.post("/todo", { title, description });
  return res.data;
};

export const updateTodo = async (
  id: number,
  title: string,
  description: string
): Promise<Todo> => {
  const res = await api.put(`/todo/${id}`, { title, description });
  return res.data;
};

export const deleteTodo = async (
  id: number,
  title: string,
  description: string
): Promise<void> => {
  await api.delete(`/todo/${id}`, {
    data: {
      title,
      description,
    },
  });
};
export const updateTodoStatus = async (
  id: number,
  status: TodoStatus
): Promise<Todo> => {
  const res = await api.put(`/todo/status/${id}`, {
    status: status,
  });
  return res.data;
};
