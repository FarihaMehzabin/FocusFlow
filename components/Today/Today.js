import { useFetchTodos } from "./hooks/useFetchTodos";
import { useTodayState } from "./hooks/useTodayState";
import AddToToday from "./AddToToday";
import Task from "./Task";
import styles from "./TodoList.module.css";

const Today = () => {
  const { todo, setTodo, loading } = useFetchTodos();
  const { addTodo, deleteTodo, editTodo } = useTodayState(todo, setTodo);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${styles.todoListRoot} ${styles.todolist}`}>
      <h1>
        Today
        <span>Add all the tasks you want to complete today!</span>
      </h1>
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
  );
};

export default Today;
