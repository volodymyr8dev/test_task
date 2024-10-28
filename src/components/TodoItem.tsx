import React, { useState } from "react";
import { Todo, TodoStatus } from "../types";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number, title: string, description: string) => void;
  onStatusChange: (id: number, status: TodoStatus) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onStatusChange,
  onEdit,
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const handleStatusChange = (newStatus: TodoStatus) => {
    onStatusChange(todo.id, newStatus);
    setShowStatusDropdown(false);
  };
  const toggleDropdown = () => {
    setShowStatusDropdown((prev) => !prev);
  };
  return (
    <div className="list-item-box">
      <div
        className="status-circle"
        style={{
          backgroundColor:
            todo?.status === "done"
              ? "#588157"
              : todo?.status === "pending"
              ? "#FCBF49"
              : "#D62828",
        }}
      ></div>
      <div className="list-item">
        <div onClick={toggleDropdown} className="txt-block">
          <div className="todo-title">{todo.title}</div>
          <div className="todo-descr">{todo.description}</div>
        </div>
        <div className="todo-btn-box">
          <div className="action-button" onClick={() => onEdit(todo)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C16.2626 1.73735 16.5744 1.52901 16.9176 1.38687C17.2608 1.24473 17.6286 1.17157 18 1.17157C18.3714 1.17157 18.7392 1.24473 19.0824 1.38687C19.4256 1.52901 19.7374 1.73735 20 2C20.2626 2.26264 20.471 2.57444 20.6131 2.9176C20.7553 3.26077 20.8284 3.62856 20.8284 4C20.8284 4.37143 20.7553 4.73923 20.6131 5.08239C20.471 5.42555 20.2626 5.73735 20 6L6.5 19.5L1 21L2.5 15.5L16 2Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div
            className="action-button"
            onClick={() => onDelete(todo.id, todo.title, todo.description)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H5H21"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 11V17"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 11V17"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      {showStatusDropdown && (
        <div className="status-action-box">
          <button
            className="status-btn status-pending-btn"
            onClick={() => handleStatusChange("pending")}
          >
            Pending
          </button>
          <button
            className="status-btn status-done-btn"
            onClick={() => handleStatusChange("done")}
          >
            Done
          </button>
          <button
            className="status-btn status-wont-btn"
            onClick={() => handleStatusChange("won’t do")}
          >
            Won’t do
          </button>
        </div>
      )}
    </div>
  );
};
export default TodoItem;
