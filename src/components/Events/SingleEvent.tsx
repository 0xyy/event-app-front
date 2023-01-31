import { Link } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { getRandomColor } from '../../utils/get-random-color';
import { Btn } from '../UI/Btn';

import styles from './SingleEvent.module.css';

interface Props {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
}

export const SingleEvent = ({ id, name, location, startDate, endDate }: Props) => {
    return <div className={styles.eventBox}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.location} style={{ color: `#${getRandomColor()}`}}>
            <GrMapLocation /> {location}
        </p>
        <p className={styles.startDate}>Data początku: <span>{startDate}</span></p>
        <p className={styles.endDate}>Data końca: <span>{endDate}</span></p>
        <Btn><Link to='/edit-event' className={styles.btn}>EDYTUJ</Link></Btn>
    </div>
};