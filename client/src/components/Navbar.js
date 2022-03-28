import React from 'react'
import { useAppContext } from '../context/AppContext.js'
import { useState } from 'react'
import {ImMenu} from 'react-icons/im'
import styles from './styles/Navbar.module.scss';
import { Dropdown } from './Dropdown';


export const Navbar = () => {
  const {toggleSidebar, hidebar, user, logoutUser} = useAppContext();
  console.log('usernavbar', user)

  const [showLogout, setShowLogout] = useState(true)
  return (
    <nav className={styles.nav}>
          <button type='button' className={styles["toggle-btn"]} onClick={toggleSidebar}>
              <ImMenu />
          </button>
          {/* <div className={styles.navItems}>
              <a className={styles.navOne}>One</a>
              <a className={styles.navTwo}>two</a>
              <a className={styles.navThree}>three</a>
          </div> */}
          <h3 className={styles.navTitle}>PIGGY</h3>
          <Dropdown />
    </nav>
)
}
