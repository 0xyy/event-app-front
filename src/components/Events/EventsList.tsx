import React from 'react';
import { SingleEvent } from './SingleEvent';

import styles from './EventsList.module.css';

const DUMMY_EVENTS: any = [
    {
        id: 1,
        name: 'Gdańsk meetup niebieski',
        location: 'Gdańsk',
        startDate: '01.01.2023',
        endDate: '03.01.2023',
    },
    {
        id: 2,
        name: '21 savage koncert',
        location: 'Warszawa',
        startDate: '01.01.2023',
        endDate: '03.01.2023',
    },
    {
        id: 3,
        name: 'Ekspozycja pająków',
        location: 'Kraków',
        startDate: '01.01.2023',
        endDate: '03.01.2023',
    },
];

export const EventsList = () => {
    return (
        <div className={styles.eventsBox}>
            {
                DUMMY_EVENTS.map((event: any) => (
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
        </div>
    );
};