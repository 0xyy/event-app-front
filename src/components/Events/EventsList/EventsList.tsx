import React, { useEffect, useState } from 'react';
import { SingleEvent } from '../SingleEvent/SingleEvent';
import { useHttp } from '../../../hooks/http-hook';
import { LoadingSpinner } from '../../UI/LoadingSpinner/LoadingSpinner';
import { InfoModal } from '../../UI/InfoModal/InfoModal';
import { EventInterface } from 'types';

import styles from './EventsList.module.css';
import btnStyle from '../../UI/Btn/Btn.module.css';

const EVENTS_PER_PAGE = 3;

export const EventsList = () => {
    const { sendRequest, isLoading, error, clearError } = useHttp();
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect( () => {
        (async () => {
            const data = await sendRequest(`/event?page=${currentPage}&limit=${EVENTS_PER_PAGE}`);

            setEvents(data.events);
            setTotalPages(Math.ceil(data.totalEvents / EVENTS_PER_PAGE));
        })();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <InfoModal message={error} title='Ups!' onClose={clearError} isError />;
    }

    if (events.length === 0) {
        return <h1>Obecnie nie ma żadnych wydarzeń :(</h1>;
    }

    return (
        <>
            {
                events.map(({ id, name, location, startDate, endDate }: EventInterface) => (
                    <SingleEvent
                        key={id}
                        id={id}
                        name={name}
                        location={location}
                        startDate={startDate}
                        endDate={endDate}
                    />
                ))
            }
            <div className={styles.paginationBox}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={btnStyle.btn}
                >
                    POPRZEDNIA
                </button>
                <p className={styles.pagesCount}>
                    Strona {currentPage} z {totalPages}
                </p>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={btnStyle.btn}
                >
                    NASTĘPNA
                </button>
            </div>
        </>
    );
};