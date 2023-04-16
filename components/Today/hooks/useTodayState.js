// hooks/useInboxState.js
import { addItem, deleteItem, editItem } from "../services/todoService";

export const useTodayState = (todo, setTodo) => {
  const addTodo = async (newItem, categories) => {
    const newItemData = await addItem(newItem, categories);
    setTodo([...todo, newItemData]);
  };

  const deleteTodo = async (item) => {
    await deleteItem(item.id);
    setTodo(todo.filter((t) => t.id !== item.id));
  };

  const editTodo = async (updatedItem) => {
    await editItem(updatedItem);
    setTodo(
      todo.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return {
    addTodo,
    deleteTodo,
    editTodo,
  };
};
