import Navbar from "../../components/Navbar/Navbar";
import styles from './Home.module.css';
const Home = ({agencies}) => {
    return (
      <>
        <Navbar />
        <div className={styles.home}>
          {agencies.map((agency, index) => (
            <div key={index}>
              <div>{agency.name}</div>
              <div>{agency.location}</div>
              <div>{agency.phoneNumber}</div>
              <div>{agency.email}</div>
              <div>{agency.expertise}</div>
            </div>
            ))}
        </div>
      </>
    );
}

export default Home;