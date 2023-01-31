import React from 'react';
import { Layout } from './components/layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { MainView } from './views/MainView';
import { AddEventFormView } from './views/AddEventFormView';
import { NotFoundView } from './views/NotFoundView';

export const App = () => {
    return <Layout>
        <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='/add-event' element={<AddEventFormView />} />
            <Route path='/*' element={<NotFoundView />} />
        </Routes>
    </Layout>;
};

