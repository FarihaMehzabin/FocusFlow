import { useFetchTodos } from "./hooks/useFetchTodos";
import { useTodayState } from "./hooks/useTodayState";
import AddToToday from "./AddToToday";
import Task from "./Task";
import styles from "./TodoList.module.css";
import Sidebar from "/components/Sidebar";
import Image from "next/image"; 

const Today = ({ user_id }) => {
  const { todo, setTodo, loading } = useFetchTodos(user_id);
  const { addTodo, deleteTodo, editTodo, moveToFocus, moveToInbox } = useTodayState(
    todo,
    setTodo
  );

   console.log("Reached today component and user_id is", user_id);

   console.log("today component list of todos: ", todo);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.Root}>
      <Sidebar />
      <div className={`${styles.todoListRoot} ${styles.todolist}`}>
        <Image
          src="/Today.svg" // Path to your image
          alt="Today Logo" // Alt text for the image
          width={140} // Width of the image
          height={140} // Height of the image
        />
        <p>Add all the tasks you want to complete today!</p>

        <div className={`${styles.todolistSecondPart}`}>
          <AddToToday
            addItem={(newItem, categories, priority) =>
              addTodo(newItem, categories, user_id, priority)
            }
          />

          <ul>
            {todo.map((item) => (
              <Task
                key={item.id}
                item={item}
                deleteItem={(item) => deleteTodo(item, user_id)}
                editItem={(item) => editTodo(item, user_id)}
                moveToFocus={moveToFocus}
                moveToInbox={moveToInbox}
              />
            ))}
            {todo.length === 0 && (
              <p className={styles.emptyList}>Your todo list is empty.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Today;
