import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Logo } from './Logo';
import styles from './styles/Sidebar.module.scss';
import { setClass } from '../utils/functions';

export const Sidebar = () => {
  
  const {hideBar} = useAppContext();

  return (
    <div className={setClass(styles.sidebarWrapper, (hideBar && styles.hideSidebar))}>
        <Logo />
        <aside className={styles.sidebar}>
            <ul className={styles.menuList}>
                <li>Perfil</li>
                <li>Estatísticas</li>
                <li>Adicionar Itens</li>
                <li>Procurar</li>
            </ul>
        </aside>
    </div>
  )
}
