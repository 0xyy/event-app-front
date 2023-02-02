import React, { useState } from 'react';
import { useHttp } from '../../../hooks/http-hook';
import { RemoveEventResponse } from 'types';
import { InfoModal } from '../../UI/InfoModal/InfoModal';
import { LoadingSpinner } from '../../UI/LoadingSpinner/LoadingSpinner';

import styles from '../../UI/Btn/Btn.module.css';

interface Props {
    id: string | undefined;
}

export const RemoveEvent = ({ id }: Props) => {
    const { sendRequest, isLoading, error, clearError } = useHttp();
    const [showModal, setShowModal] = useState('');

    const handleRemoveEvent = async () => {
        const data: RemoveEventResponse = await sendRequest(
            `/event/${id}`,
            'DELETE',
        );

        if (data.isSuccess) {
            setShowModal(data.message);
        }
    };

    const clearModal = () => {
        setShowModal('');
        window.location.replace('/');
    };

    return <>
        {isLoading && <LoadingSpinner />}
        {error && <InfoModal message={error} title='Ups!' onClose={clearError} isError />}
        {showModal && <InfoModal title='Poszło!' message={showModal} onClose={clearModal} />}
        <button
            type='button'
            className={`${styles.btn} ${styles.deleteBtn}`}
            onClick={handleRemoveEvent}
        >
            USUŃ
        </button>
    </>;
};