import { parseCookies } from "nookies";
import Today from "../../components/Today/Today";

const TodayPage = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <div>Not authorized</div>;
  }

  return <Today />;
};

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const guid = cookies.session;

  console.log(context.req.headers);

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
    props: { isLoggedIn: true }, // Will be passed to the page component as props
  };
}

export default TodayPage;
