// import { useState } from 'react';
// import ToggleButton from '../components/ToggleButton';
// import styles from '../styles/TodoList.module.css';

// export default function Home() {
//   const [newItem, setNewItem] = useState('');
//   const [sortByStatus, setSortByStatus] = useState(false);
//   const [todo, setTodo] = useState([
//     { id: 1, label: 'Learn VueJs', done: false },
//     { id: 2, label: 'Code a todo list', done: false },
//     { id: 3, label: 'Learn something else', done: false },
//   ]);

//   const addItem = () => {
//     setTodo([...todo, { id: Math.floor(Math.random() * 9999) + 10, label: newItem, done: false }]);
//     setNewItem('');
//   };

//   const markAsDoneOrUndone = (item) => {
//     const updatedItem = { ...item, done: !item.done };
//     setTodo(todo.map((t) => (t.id === item.id ? updatedItem : t)));
//   };

//   const deleteItemFromList = (item) => {
//     setTodo(todo.filter((t) => t.id !== item.id));
//   };

//   const clickOnToggle = (active) => {
//     setSortByStatus(active);
//   };

//   const todoByStatus = () => {
//     if (!sortByStatus) {
//       return todo;
//     }

//     const doneArray = todo.filter((item) => item.done);
//     const notDoneArray = todo.filter((item) => !item.done);

//     return [...notDoneArray, ...doneArray];
//   };

//   return (
//     <div className={`${styles.todoListRoot} ${styles.todolist}`}>
//       <h1>
//         Todo List
//         <span>Get things done, one item at a time.</span>
//       </h1>

//       {todo.length > 0 ? (
//         <>
//           <ul>
//             {todoByStatus().map((item) => (
//               <li key={item.id} className={item.done ? `${styles.done}` : ""}>
//                 <span className={styles.label}>{item.label}</span>
//                 <div className={styles.actions}>
//                   <button
//                     className={styles.btnPicto}
//                     type="button"
//                     onClick={() => deleteItemFromList(item)}
//                     aria-label="Delete"
//                     title="Delete"
//                   >
//                     <i aria-hidden="true" className="material-icons">
//                       delete
//                     </i>
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p className={styles.emptyList}>Your todo list is empty.</p>
//       )}

//       <form
//         className={styles.form}
//         name="newform"
//         onSubmit={(e) => {
//           e.preventDefault();
//           addItem();
//         }}
//       >
//         <label htmlFor="newitem" className={styles.formLabel}>
//           Add to the todo list
//         </label>
//         <input
//           type="text"
//           name="newitem"
//           id="newitem"
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           className={styles.formInput}
//         />
//         <button type="submit" className={styles.formButton}>
//           Add item
//         </button>
//       </form>
//     </div>
//   );
// }



import Inbox from "../components/Inbox/Inbox";

export default function Home() {
  return <Inbox />;
}