import React, { useEffect, useState } from 'react';
import { SingleEvent } from './SingleEvent';
import { useHttp } from '../../hooks/http-hook';
import { LoadingSpinner } from '../UI/LoadingSpinner/LoadingSpinner';

import styles from './EventsList.module.css';
import btnStyle from '../UI/Btn/Btn.module.css';

const EVENTS_PER_PAGE = 3;

export const EventsList = () => {
    const { sendRequest, isLoading } = useHttp();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect( () => {
        (async () => {
            const data = await sendRequest(
                `/event?page=${currentPage}&limit=${EVENTS_PER_PAGE}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                },
            );

            setEvents(data.events);
            setTotalPages(Math.ceil(data.totalEvents / EVENTS_PER_PAGE));
        })();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (events.length === 0) {
        return <h1>Obecnie nie ma żadnych wydarzeń :(</h1>;
    }

    return (
        <>
            {
                events.map((event: any) => (
                    <SingleEvent
                        key={event.id}
                        id={event.id}
                        name={event.name}
                        location={event.location}
                        startDate={event.startDate}
                        endDate={event.endDate}
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