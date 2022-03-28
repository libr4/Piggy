import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { SmallSideBar, BigSideBar } from "../components/";
import { Navbar } from "../components/Navbar";
import{ Sidebar } from '../components/Sidebar.js';
import styles from './styles/Dashboard.module.css';

export const Dashboard = () => {
  return (     
      <div className={styles['container']}>
          <Sidebar />
          <div className={styles['wrapper']}>
              <Navbar />
              <Outlet />
          </div>
      </div>   
    );
}

