import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { MainView } from './views/MainView';
import { AddEventFormView } from './views/AddEventFormView';
import { EditEventForm } from './components/Forms/EditEventForm';
import { NotFoundView } from './views/NotFoundView';

export const App = () => {
    return <Layout>
        <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='/add-event' element={<AddEventFormView />} />
            <Route path='/edit-event' element={<EditEventForm />} />
            <Route path='/*' element={<NotFoundView />} />
        </Routes>
    </Layout>;
};

