import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useToast } from '@chakra-ui/react';
import { Btn } from '../UI/Btn/Btn';
import { FormErrorMessage } from '../UI/FormErrorMessage/FormErrorMessage';
import { useHttp } from '../../hooks/http-hook';
import { LoadingSpinner } from '../UI/LoadingSpinner/LoadingSpinner';
import { InfoModal } from '../UI/InfoModal/InfoModal';
import { EventSchema } from '../../yup-schemas/event-schema';
import { CreateEventResponse } from 'types';

import styles from './EventForm.module.css';

export const AddEventForm = () => {
    const { sendRequest, isLoading, error, clearError } = useHttp();

    const toast = useToast();
    const [toastMessage, setToastMessage] = useState({
        title: '',
        description: '',
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            startDate: new Date(),
            endDate: new Date(),
        },
        validationSchema: EventSchema,
        onSubmit: async values => {
            const data: CreateEventResponse = await sendRequest(
                '/event',
                'POST',
                {
                    name: values.name,
                    location: values.location,
                    startDate: values.startDate,
                    endDate: values.endDate,
                },
            );

            if (data.isSuccess) {
                setToastMessage({
                    title: 'Sukces!',
                    description: data.message,
                });
            }
        },
    });

    useEffect(() => {
        const { title, description } = toastMessage;
        if (title !== '' && description !== '') {
            toast({
                title,
                description,
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom',
            });
        }
    }, [toastMessage, toast]);

    if (isLoading) {
        return <div className='formBox formBoxLoading'>
            <LoadingSpinner/>
        </div>;
    }

    return <div className='formBox'>
        <h1>Dodaj swoje wydarzenie</h1>
        {error && <InfoModal message={error} title='Ups!' onClose={clearError} isError />}
        <form onSubmit={formik.handleSubmit} className={styles.eventForm}>
            <p>
                <label>
                    Nazwa wydarzenia:
                    <br/>
                    <input
                        type="text"
                        name="name"
                        placeholder="np. Koncert"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
            </p>
            {
                (formik.touched.name && !!formik.errors.name) &&
                <FormErrorMessage message={formik.errors.name} />
            }
            <p>
                <label>
                    Lokalizacja:
                    <br/>
                    <input
                        type="text"
                        name="location"
                        placeholder="np. Gdańsk"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
            </p>
            {
                (formik.touched.location && !!formik.errors.location) &&
                <FormErrorMessage message={formik.errors.location} />
            }
            <p>
                <label>
                    Data początku:
                    <br/>
                    <input
                        type="date"
                        name="startDate"
                        value={(formik.values.startDate.toISOString()).split('T')[0]}
                        onChange={e => formik.setFieldValue('startDate', new Date(e.target.value))}
                        onBlur={formik.handleBlur}
                    />
                </label>
            </p>
            {
                (formik.touched.startDate && !!formik.errors.startDate) &&
                <FormErrorMessage message={formik.errors.startDate} />
            }
            <p>
                <label>
                    Data końca:
                    <br/>
                    <input
                        type="date"
                        name="endDate"
                        value={(formik.values.endDate).toISOString().split('T')[0]}
                        onChange={e => formik.setFieldValue('endDate', new Date(e.target.value))}
                        onBlur={formik.handleBlur}
                    />
                </label>
            </p>
            {
                (formik.touched.endDate && !!formik.errors.endDate) &&
                <FormErrorMessage message={formik.errors.endDate} />
            }
            <div>
                <Btn submit>DODAJ</Btn>
            </div>
        </form>
    </div>;
};
