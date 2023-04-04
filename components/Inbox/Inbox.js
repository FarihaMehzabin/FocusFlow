import { useState, useEffect } from "react";
import AddToInbox from "./AddToInbox";
import Task from "./Task";
import styles from "./TodoList.module.css";

const Inbox = () => {
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

const addItem = async (newItem, categories) => {
  const parsedCategories =
    categories.trim() !== "" ? categories.split(" ") : ["Task"];
  const response = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: newItem, categories: parsedCategories }),
  });
  const data = await response.json();
  setTodo([...todo, data]);
};

const deleteItemFromList = async (item) => {
  await fetch("/api/items", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: item.id }),
  });
  setTodo(todo.filter((t) => t.id !== item.id));
};

const editItem = async (updatedItem) => {
  await fetch("/api/items", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  });
  setTodo(
    todo.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  );
};

  return (
    <div className={`${styles.todoListRoot} ${styles.todolist}`}>
      <h1>
        Inbox
        <span>Add all your random thoughts here!</span>
      </h1>

      <AddToInbox addItem={addItem} />
      
        <ul>
          {todo.map((item) => (
            <Task
              key={item.id}
              item={item}
              deleteItem={deleteItemFromList}
              editItem={editItem}
            />
          ))}
        </ul>

      {todo.length === 0 && (
        <p className={styles.emptyList}>Your todo list is empty.</p>
      )}
    </div>
  );
};

export default Inbox;
