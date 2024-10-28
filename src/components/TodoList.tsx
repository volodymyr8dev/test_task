import React, { useEffect, useState } from "react";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
} from "../api/todos";
import { Todo, TodoStatus } from "../types";
import { useAuth } from "../context/AuthContext";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const { isAuthenticated, loginUser } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTodosList = async () => {
    setLoading(true);
    try {
      const todos = await fetchTodos();
      setTodos(todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to load todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        if (!isAuthenticated) {
          await loginUser();
        }
        await fetchTodosList();
      } catch (err) {
        console.error("Error loading todos:", err);
        setError("Failed to load todos. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, [isAuthenticated, loginUser]);

  const handleCreateTodo = async (title: string, description: string) => {
    await createTodo(title, description);
    await fetchTodosList();
    setModalVisible(false);
  };

  const handleEditTodo = async (
    id: number,
    title: string,
    description: string
  ) => {
    await updateTodo(id, title, description);
    await fetchTodosList();
    setModalVisible(false);
    setSelectedTodo(null);
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  };

  const handleDeleteTodo = async (
    id: number,
    title: string,
    description: string
  ) => {
    await deleteTodo(id, title, description);
    await fetchTodosList();
  };

  const handleStatusChange = async (id: number, status: TodoStatus) => {
    const updatedTodo = await updateTodoStatus(id, status);
    await fetchTodosList();
  };
  return (
    <>
      <h1 className="title">My To-Do</h1>
      {error && <h2 className="error">Something went wrong</h2>}

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="container">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
            />
          ))}
          {!modalVisible && (
            <button
              className="addButton"
              onClick={() => {
                setSelectedTodo(null);
                setModalVisible(true);
              }}
            >
              <span> &#43;</span>
            </button>
          )}

          {modalVisible && (
            <TodoForm
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onCreate={handleCreateTodo}
              onEdit={handleEditTodo}
              selectedTodo={selectedTodo}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TodoList;
