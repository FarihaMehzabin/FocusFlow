import { useState, useEffect } from "react";

export const useFetchTodos = (user_id) => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`/api/items?user_id=${user_id}&section=Inbox`);
        const data = await response.json();

        console.log("Inobx: data received in FetchTodos",data);

        setTodo(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [user_id]);


  return { todo, setTodo, loading };
};
