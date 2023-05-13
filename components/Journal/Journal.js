import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import styles from "./Journal.module.css";
import Sidebar from "/components/Sidebar";

export default function Home() {
  return (
    <div className={styles.Root}>
      <Sidebar />
      <div
        className="d-flex flex-column align-items-center justify-content-center min-vh-100"
        style={{ backgroundColor: "#0CA6BC", flex: "auto" }}
      >
        <div className={styles.book}>
          <span className={`${styles.page} ${styles.turn}`}></span>
          <span className={`${styles.page} ${styles.turn}`}></span>
          <span className={`${styles.page} ${styles.turn}`}></span>
          <span className={`${styles.page} ${styles.turn}`}></span>
          <span className={`${styles.page} ${styles.turn}`}></span>
          <span className={`${styles.page} ${styles.turn}`}></span>
          <span className={styles.cover}></span>
          <span className={styles.page}></span>
          <span className={`${styles.cover} ${styles.turn}`}></span>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1
            className="display-4 font-weight-bold mb-4"
            style={{ color: "#DDDD68" }}
          >
            Journal 📓
          </h1>
          <div className="d-flex flex-row justify-content-center mb-4">
            <Link href="/journal">
              <Button
                variant="secondary"
                className="m-2 py-3 px-5 text-uppercase font-weight-bold rounded-pill"
                style={{ color: "#DDDD68" }}
              >
                <i className="fas fa-pen mr-2"></i> Start Journaling
              </Button>
            </Link>
            <Link href="/entries/index">
              <Button
                variant="secondary"
                className="m-2 py-3 px-5 text-uppercase font-weight-bold rounded-pill"
                style={{ color: "#DDDD68" }}
              >
                <i className="fas fa-list mr-2"></i> View Journal Entries
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
