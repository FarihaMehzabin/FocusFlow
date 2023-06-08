// hooks/useInboxState.js
import { addItem, deleteItem, editItem, changeSectionStatus } from "../services/todoService";

export const useTodayState = (todo, setTodo) => {
  const addTodo = async (title, categories, user_id) => {
    console.log("Type of new item: ", typeof title); // check the type of newItem
    const newItemId = await addItem(title, categories, user_id, priority);
    setTodo((prevTodo) => {
      const newTodo = [
        ...prevTodo,
        { title, categories, id: newItemId, priority },
      ]; // add new id here
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

  const moveToFocus = async (item) => {

    // Call the API or service to update the task's section status
    await changeSectionStatus(item.id, "Today", "Focus");

    setTodo(todo.filter((t) => t.id !== item.id));
  };

    const moveToInbox = async (item) => {
      // Call the API or service to update the task's section status
      await changeSectionStatus(item.id, "Today", "Inbox");

      setTodo(todo.filter((t) => t.id !== item.id));
    };

  return {
    addTodo,
    deleteTodo,
    editTodo,
    moveToFocus,
    moveToInbox,
  };
};







