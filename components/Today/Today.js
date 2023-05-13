import { useFetchTodos } from "./hooks/useFetchTodos";
import { useTodayState } from "./hooks/useTodayState";
import AddToToday from "./AddToToday";
import Task from "./Task";
import styles from "./TodoList.module.css";
import Sidebar from "/components/Sidebar";
import Image from "next/image"; 

const Today = () => {
  const { todo, setTodo, loading } = useFetchTodos();
  const { addTodo, deleteTodo, editTodo } = useTodayState(todo, setTodo);

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
          <AddToToday addItem={addTodo} />

          <ul>
            {todo.map((item) => (
              <Task
                key={item.id}
                item={item}
                deleteItem={deleteTodo}
                editItem={editTodo}
              />
            ))}
          </ul>

          {todo.length === 0 && (
            <p className={styles.emptyList}>Your todo list is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Today;
