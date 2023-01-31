import React from 'react';

import styles from './Btn.module.css';

interface Props {
    children: React.ReactNode;
}

export const Btn = ({ children }: Props) => {
    return <button className={styles.btn}>{children}</button>;
}