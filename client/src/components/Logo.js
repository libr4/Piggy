import React from 'react'
import styles from './styles/Logo.module.scss';
import { useAppContext } from '../context/AppContext';
import { setClass } from '../utils/functions';

export const Logo = () => {
    const {hideBar} = useAppContext();
  return (
      <div className={styles.logoContainer}>
          <div className={styles.logo}>
              <div className={styles['tip']}></div>
              <div className={styles['tail']}></div>
              <div className={setClass(styles['julia'], !hideBar && styles['giragira'])}>
                  <div className={styles['line']}></div>
              </div>
              {/* <div>PIGGY</div> */}
          </div>
      </div>
  )
}
