import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

export const NotFound = () => {
    return <div className={styles.notFound}>
        <h1 className={styles.errorCode}>404</h1>
        <h1>Przepraszamy, nie znaleziono strony o podanym adresie</h1>
        <Link to='/'>Przejdź do strony głównej</Link>
    </div>;
};