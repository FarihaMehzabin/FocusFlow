// hooks/useInboxState.js
import {
  addItem,
  deleteItem,
  editItem,
  changeSectionStatus,
} from "../services/todoService";

export const useInboxState = (todo, setTodo) => {
  const addTodo = async (title, categories, user_id, priority) => {
    console.log("Type of new item: ", typeof title); // check the type of newItem
    const newItemId = await addItem(title, categories, user_id, priority);
    setTodo((prevTodo) => {
      const newTodo = [...prevTodo, { title, categories, id: newItemId, priority }]; // add new id here
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

    const moveToToday = async (item) => {
      // Call the API or service to update the task's section status
      await changeSectionStatus(item.id, "Inbox", "Today");

      setTodo(todo.filter((t) => t.id !== item.id));
    };

  return {
    addTodo,
    deleteTodo,
    editTodo,
    moveToToday
  };
};
