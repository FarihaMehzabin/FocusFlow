// pages/sections/inbox.js
import { parseCookies } from "nookies";
import Inbox from "../../components/Inbox/Inbox";

const InboxPage = ({ isLoggedIn,  user_id}) => {
  if (!isLoggedIn) {
    return <div>Not authorized</div>;
  }

  return <Inbox user_id={user_id} />;
};

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const guid = cookies.session;


  console.log("cookies" + cookies.session);

  // Make a request to your Flask server to check if the GUID is valid
  const res = await fetch(
    `http://127.0.0.1:8080/check-cookie-validity/${guid}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  const data = await res.json();

  console.log("user_id", data.user_id);

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
    props: { isLoggedIn: true, user_id: data.user_id },
  };
}

export default InboxPage;
