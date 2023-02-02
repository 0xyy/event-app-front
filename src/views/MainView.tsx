import React from 'react';
import { EventsList } from '../components/Events/EventsList';

export const MainView = () => {
    return <div className='eventsBox'>
        <EventsList/>
    </div>;
};