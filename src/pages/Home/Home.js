import Navbar from "../../components/Navbar/Navbar";
import styles from './Home.module.css';
const Home = () => {
    return (
      <>
        <Navbar />
        <div className={styles.home}>
          <h1>Home</h1>
        </div>
      </>
    );
}

export default Home;