// hooks/useInboxState.js
import { addItem, deleteItem, editItem } from "../services/todoService";

export const useTodayState = (todo, setTodo) => {
  const addTodo = async (title, categories, user_id) => {
    console.log("Type of new item: ", typeof title); // check the type of newItem
    const newItemId = await addItem(title, categories, user_id);
    setTodo((prevTodo) => {
      const newTodo = [...prevTodo, { title, categories, id: newItemId }]; // add new id here
      console.log("Newtodos", newTodo);
      return newTodo;
    });
  };

  const deleteTodo = async (item, user_id) => {
    await deleteItem(item.id, user_id);
    setTodo(todo.filter((t) => t.id !== item.id));
  };

  const editTodo = async (updatedItem, user_id) => {
    await editItem(updatedItem, user_id);
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
