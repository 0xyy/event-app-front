import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http-hook';
import { Btn } from '../UI/Btn/Btn';
import { EventSchema } from '../../yup-schemas/event-schema';
import { LoadingSpinner } from '../UI/LoadingSpinner/LoadingSpinner';
import { FormErrorMessage } from '../UI/FormErrorMessage/FormErrorMessage';
import { InfoModal } from '../UI/InfoModal/InfoModal';
import { RemoveEvent } from '../Events/RemoveEvent/RemoveEvent';
import  { EventInterface, EditEventResponse } from 'types';

import styles from './EventForm.module.css';

export const EditEventForm = () => {
    const { id } = useParams();
    const { sendRequest, isLoading, error, clearError } = useHttp();
    const [event, setEvent] = useState<EventInterface | null>(null);

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
            const data: EditEventResponse = await sendRequest(
                `/event/${id}`,
                'PUT',
                {
                    name: values.name,
                    location: values.location,
                    startDate: values.startDate,
                    endDate: values.endDate,
                },
            );

            if (data.isSuccess) {
                setToastMessage({
                    title: 'Mamy to!',
                    description: data.message,
                });
            }
        },
    });

    useEffect(() => {
        (async () => {
            const data = await sendRequest(`/event/${id}`);

            if (data.isSuccess) {
                const { event } = data;
                setEvent(event);

                await formik.setValues({
                    name: event.name,
                    location: event.location,
                    startDate: new Date(Date.parse(event.startDate)),
                    endDate: new Date(Date.parse(event.endDate)),
                });
            }
        })();
    }, []);

    useEffect(() => {
        const { title, description } = toastMessage;
        if (title !== '' && description !== '') {
            toast({
                title,
                description,
                status: 'info',
                duration: 4000,
                isClosable: true,
                position: 'bottom',
                styleConfig: {
                    border: 'none',
                    color: 'red',
                }
            });
        }
    }, [toastMessage, toast]);

    if (isLoading || !event) {
        return <div className='formBox formBoxLoading'>
            <LoadingSpinner/>
        </div>;
    }

    return <div className='formBox'>
        <h1>Edycja wydarzenie</h1>
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
                        value={(formik.values.endDate.toISOString()).split('T')[0]}
                        onChange={e => formik.setFieldValue('endDate', new Date(e.target.value))}
                        onBlur={formik.handleBlur}
                    />
                </label>
            </p>
            {
                (formik.touched.endDate && !!formik.errors.endDate) &&
                <FormErrorMessage message={formik.errors.endDate} />
            }
            <div className={styles.btnBox}>
                <Btn submit>EDYTUJ</Btn>
                <RemoveEvent id={id}/>
            </div>
        </form>
    </div>;
};