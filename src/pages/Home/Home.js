import Navbar from '../../components/Navbar/Navbar';
import styles from './Home.module.css';
const Home = ({ agencies }) => {
  return (
    <>
      <Navbar />
      <div className={styles.home}>
        {agencies.map((agency, index) => (
          <div key={index} className="bg-white shadow-md  rounded-lg p-4 mb-4">
            <div className="text-lg font-semibold">{agency.name}</div>
            <div className="text-gray-600">{agency.location}</div>
            <div className="text-gray-600">{agency.phoneNumber}</div>
            <div className="text-blue-500">{agency.email}</div>
            <div className="text-gray-700">{agency.expertise}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
