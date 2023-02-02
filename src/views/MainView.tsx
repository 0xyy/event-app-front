import React from 'react';
import { EventsList } from '../components/Events/EventsList/EventsList';

export const MainView = () => {
    return <div className='eventsBox'>
        <EventsList/>
    </div>;
};