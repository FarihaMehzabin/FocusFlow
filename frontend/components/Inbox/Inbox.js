import { useFetchTodos } from "./hooks/useFetchTodos";
import { useInboxState } from "./hooks/useInboxState";
import AddToInbox from "./AddToInbox";
import Task from "./Task";
import styles from "./TodoList.module.css";
import Sidebar from "/components/Sidebar";
import Image from "next/image"; 

const Inbox = ({ user_id }) => {
  const { todo, setTodo, loading } = useFetchTodos(user_id);
  const { addTodo, deleteTodo, editTodo, moveToToday } = useInboxState(todo, setTodo);


  console.log("Reached inbox component and user_id is", user_id);

  console.log("inbox component list of todos: ", todo)

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${styles.Root}`}>
      <Sidebar />
      <div className={`${styles.todoListRoot} ${styles.todolist}`}>
        <Image
          src="/Inbox.svg" // Path to your image
          alt="Inbox Logo" // Alt text for the image
          width={140} // Width of the image
          height={140} // Height of the image
        />
        <p>Add all your random thoughts here!</p>

        <div className={`${styles.todolistSecondPart}`}>
          <AddToInbox
            addItem={(newItem, categories) =>
              addTodo(newItem, categories, user_id)
            }
          />
          <ul>
            {todo.map((item) => (
              <Task
                key={item.id}
                item={item}
                deleteItem={(item) => deleteTodo(item, user_id)}
                editItem={(item) => editTodo(item, user_id)}
                moveToToday={moveToToday}
              />
            ))}
            {todo.length === 0 && (
              <h3 className={styles.emptyList}>Inbox is empty.</h3>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
