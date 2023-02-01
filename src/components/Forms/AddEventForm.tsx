import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Btn } from '../UI/Btn/Btn';
import { FormErrorMessage } from '../UI/FormErrorMessage/FormErrorMessage';

import styles from './AddEventForm.module.css';

const AddEventSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Nazwa wydarzenia jest za krótka.')
        .max(24, 'Nazwa wydarzenia jest za długa.')
        .required('Nazwa wydarzenia jest wymagana.'),
    location: Yup.string()
        .min(2, 'Lokalizacja jest za krótka.')
        .max(35, 'Lokalizacja jest za długa.')
        .required('Lokalizacja jest wymagana.'),
    startDate: Yup.date()
        .min(new Date(), 'Data początku nie może być wcześniejsza niż dzisiejsza data.')
        .required('Data początku jest wymagana.'),
    endDate: Yup.date()
        .when('startDate', (startDate, schema) => {
            return schema.min(new Date(startDate), 'Data końca nie może być wcześniejsza niż data początku.')
        })
        .required('Data końca jest wymagana.')
});

export const AddEventForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            startDate: new Date(),
            endDate: new Date(),
        },
        validationSchema: AddEventSchema,
        onSubmit: async values => {
            console.log(values)
            console.log(values.endDate instanceof Date)
        },
    });

    return <div className='formBox'>
        <h1>Dodaj swoje wydarzenie</h1>
        <form onSubmit={formik.handleSubmit} className={styles.addForm}>
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
}
