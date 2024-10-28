import React, { useEffect, useState } from "react";
import { Todo } from "../types";

interface TodoFormProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => Promise<void>;
  onEdit: (id: number, title: string, description: string) => Promise<void>;
  selectedTodo: Todo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({
  visible,
  onClose,
  onCreate,
  onEdit,
  selectedTodo,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [selectedTodo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTodo) {
      await onEdit(selectedTodo.id, title, description);
    } else {
      await onCreate(title, description);
    }
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="field input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="field text-area"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <div className="btn-box">
          <button className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn done-btn" type="submit">
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
