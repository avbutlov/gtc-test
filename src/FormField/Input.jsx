import styles from './Input.module.scss'
import {useEffect} from "react";
import axios from "axios";

export const Input = ({label, name, type, validationInfo, register, withError}) => {

    useEffect(() => {
        axios.post('http://localhost:3000/users', {id: 4, name: '123213'})
    }, [])

    return (
        <div className={styles.inputWrapper}>
            <span className={styles.name}>{label}</span>
            <input className={withError ? styles.error : ''} type={type} {...register(name, validationInfo)}/>
            <span></span>
        </div>
    )
}