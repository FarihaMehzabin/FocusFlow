import { parseCookies } from "nookies";
import Inbox from "../components/Inbox/Inbox";
import Notifications from "../components/Notifications";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";


Modal.setAppElement("#__next"); // or whatever your app element is

export default function Home({ isLoggedIn, user_id }) {
  console.log("Is logged in ", isLoggedIn);

  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

useEffect(() => {
  if (isLoggedIn) {
    let source = new EventSource(
      `http://127.0.0.1:8083/task_updates?user_id=${user_id}`
    );

    console.log("notification is started", user_id);

    source.onopen = function (event) {
      console.log("Connection established successfully", event);
    };

    source.onmessage = function (event) {
      let newTasks = JSON.parse(event.data);
      console.log(newTasks);
      if (newTasks.length > 0) {
        setTasks((oldTasks) => [...oldTasks, ...newTasks]);
        setModalIsOpen(true);
      }
    };

    source.onerror = function (err) {
      console.error("EventSource encountered an error:", err);

      // Reconnect logic
      if (source.readyState === EventSource.CLOSED) {
        // Connection was closed, try to reconnect
        console.log("Connection was closed, trying to reconnect...");
        source = new EventSource(
          `http://127.0.0.1:8082/task_updates?user_id=${user_id}`
        );
      }
    };

    return () => {
      console.log("Closing the EventSource connection...");
      source.close();
    };
  }
}, [isLoggedIn]);


  const closeModal = () => {
    setTasks([]);
    setModalIsOpen(false);
  };

  if (!isLoggedIn) {
    return <h1>You must be logged in to view this page</h1>;
  }

  return (
    <div>
      <Inbox user_id={user_id} />
      {modalIsOpen && (
        <Notifications tasks={tasks} closeNotification={closeModal} />
      )}
    </div>
  );
}

//... the rest of your code remains unchanged ...

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const guid = cookies.session;

  console.log(context.req.headers);

  console.log("cookies" + cookies.session);

  // Make a request to your Flask server to check if the GUID is valid
  const res = await fetch(
    `http://127.0.0.1:8082/check-cookie-validity/${guid}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  const data = await res.json();

  console.log("data received", data);

  if (!data.valid) {
    // Redirect to login page if the GUID is not valid
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { isLoggedIn: true, user_id: data.user_id }, // Will be passed to the page component as props
  };
}
