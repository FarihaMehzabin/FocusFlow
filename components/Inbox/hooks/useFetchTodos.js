// hooks/useFetchTodos.js
import { useState, useEffect } from "react";

export const useFetchTodos = () => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return { todo, setTodo, loading };
};
