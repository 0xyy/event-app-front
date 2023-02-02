import React from 'react';

import styles from './Btn.module.css';

interface Props {
    children: React.ReactNode;
    submit?: boolean;
}

export const Btn = ({ children, submit }: Props) => {
    return <button className={styles.btn} type={submit ? 'submit' : undefined}>{children}</button>;
};