import React from 'react';
import { FormikErrors } from 'formik';

import styles from './FormErrorMessage.module.css';

interface Props {
    message: string | FormikErrors<Date>;
}

export const FormErrorMessage = ({ message }: Props) => {
    return <span className={styles.error}>{message as string}</span>;
};