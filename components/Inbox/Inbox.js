import { useFetchTodos } from "./hooks/useFetchTodos";
import { useInboxState } from "./hooks/useInboxState";
import AddToInbox from "./AddToInbox";
import Task from "./Task";
import styles from "./TodoList.module.css";

const Inbox = () => {
  const { todo, setTodo, loading } = useFetchTodos();
  const { addTodo, deleteTodo, editTodo } = useInboxState(todo, setTodo);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${styles.todoListRoot} ${styles.todolist}`}>
      <h1>
        Inbox
        <span>Add all your random thoughts here!</span>
      </h1>

      <AddToInbox addItem={addTodo} />

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
  );
};

export default Inbox;
