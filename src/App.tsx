// src/App.tsx
import React from "react";
import TodoList from "./components/TodoList";
import { AuthProvider } from "./context/AuthContext";
import "./styles/index.css";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="appContainer">
        <TodoList />
      </div>
    </AuthProvider>
  );
};

export default App;
