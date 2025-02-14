import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";
import { useAuthContext } from "../contexts/AuthContext";

export default function Homepage() {
  const { user } = useAuthContext();
  console.log("isLoggedIn", Boolean(user));
  return (
    <main className={styles.homepage}>
      <PageNav isLoggedIn={Boolean(user)} />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link className="cta" to="/app">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}
