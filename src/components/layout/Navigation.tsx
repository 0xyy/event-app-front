import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
    return <nav className={styles.menu}>
        <ul>
            <li>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }
                >
                    Wydarzenia
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/add-event'
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }
                >
                    Dodaj wydarzenie
                </NavLink>
            </li>
        </ul>
    </nav>;
};