import React, { useState } from 'react'
import styles from "./styles/Dropdown.module.scss";
import { setClass } from '../utils/functions';
import { useAppContext } from '../context/AppContext';

export const Dropdown = () => {

    const {toggleDropdown, dropMenu} = useAppContext();

    return (
        <div className={styles.dropdownContainer}>
            <button onClick={toggleDropdown} className={styles["dropdown-btn"]}>
                Zé
            </button> 
            <div className={setClass(styles.menu, dropMenu && styles['drop'])}>
                <div>Logout</div>
                <div>Logout</div>
                <div>Logout</div>
                <div>Logout</div>
            </div>
        </div>
  )
}
