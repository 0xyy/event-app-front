import React from 'react';
import { Btn } from '../UI/Btn/Btn';

import styles from './AddEventForm.module.css';

export const EditEventForm = () => {
    return <div className='formBox'>
        <h1>Edytuj wydarzenie</h1>
        <form className={styles.addForm}>
            <p>
                <label>
                    Nazwa wydarzenia:
                    <br/>
                    <input
                        type="text"
                        max={24}
                        placeholder="np. Koncert"
                    />
                </label>
            </p>
            <p>
                <label>
                    Lokalizacja:
                    <br/>
                    <input
                        type="text"
                        placeholder="np. Gdańsk"
                    />
                </label>
            </p>
            <p>
                <label>
                    Data początku:
                    <br/>
                    <input
                        type="date"
                    />
                </label>
            </p>
            <p>
                <label>
                    Data końca:
                    <br/>
                    <input
                        type="date"
                    />
                </label>
            </p>
            <Btn>EDYTUJ</Btn>
        </form>
    </div>;
};