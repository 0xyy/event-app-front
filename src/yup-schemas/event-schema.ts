import * as Yup from 'yup';

export const EventSchema = Yup.object().shape({
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