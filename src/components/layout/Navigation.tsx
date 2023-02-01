import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

export const Navigation = () => {
    return <nav className={styles.menu}>
        <ul>
            <li>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `${styles.btn} ${isActive ? `${styles.active}` : undefined}`
                    }
                >
                    Wydarzenia
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/add-event'
                    className={({ isActive }) =>
                        `${styles.btn} ${isActive ? `${styles.active}` : undefined}`
                    }
                >
                    Dodaj wydarzenie
                </NavLink>
            </li>
        </ul>
    </nav>;
};