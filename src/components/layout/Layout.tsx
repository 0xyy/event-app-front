import React from 'react';
import { Navigation } from './Navigation';

interface Props {
    children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
    return <>
        <Navigation />
        {children}
    </>;
};