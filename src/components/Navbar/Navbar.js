import { React } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.landingNavbar}>
      {/* <div className={styles.landingNavbarLogo}> <-- Project Logo
        <img/>
      </div> */}
      <div className={styles.landingNavbarLinks}>
        <p>
          <NavLink to="/home">Home</NavLink>
        </p>
        <p>
          <NavLink to="/map">Map</NavLink>
        </p>
        <p>
          <NavLink to="/test">Add Disaster</NavLink>
        </p>
        <p>
          <NavLink to="/">Logout</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
