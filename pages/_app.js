import '@/styles/globals.css'
import "../styles/react-datepicker.css";
import Sidebar from "/components/Sidebar";
// import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (<div>
      <Sidebar />
      <div style={{ marginLeft: '200px' }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
