import styles from './App.module.scss';
import {Switch} from "../Switch/Switch";
import {Input} from "../FormField/Input";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';

import axios from "axios";
import {useMemo} from "react";

const formInputsData = {
    authorization: [
        {
            type: "email",
            name: "email",
            label: "Эл. почта",
            validationInfo: {required: true, pattern: /^\S+@\S+$/i}
        },
        {
            type: "password",
            name: "password",
            label: "Ваш пароль",
            validationInfo: {required: true, minLength: 8, maxLength: 15}
        },
    ],
    registration: [
        {
            type: "text",
            name: "name",
            label: "Ваше имя",
            validationInfo: {required: true, maxLength: 20},
            isRegistration: true
        },
        {
            type: "text",
            name: "surname",
            label: "Ваша фамилия",
            validationInfo: {required: true, maxLength: 20},
            isRegistration: true
        },
        {
            type: "email",
            name: "email",
            label: "Эл. почта",
            validationInfo: {required: true, pattern: /^\S+@\S+$/i}
        },
        {
            type: "password",
            name: "password",
            label: "Пароль",
            validationInfo: {required: true, minLength: 8, maxLength: 15}
        },
    ]
}

function App() {
    const formType = useSelector((state) => state.formType);
    const {handleSubmit, formState: {errors}, register} = useForm()

    const onSubmit = async (data) => {
        const {data: usersInfo} = await axios.get('http://localhost:3000/users');
        if (formType === 'registration') {
            const isUserExisted = usersInfo.every((usersInfo) => usersInfo.email !== data.email);
            if (isUserExisted) {
                await axios.post('http://localhost:3000/users', data);
                ToastsStore.success('Вы зарегистрированы');
            } else {
                ToastsStore.error('Пользователь с таким email уже существует');
            }

        } else if (formType === 'authorization') {
            const isAuthorized = usersInfo.some((usersInfo) =>
                usersInfo.email === data.email && usersInfo.password === data.password)

            if (isAuthorized) {
                ToastsStore.success('Вы авторизованы');
            } else {
                ToastsStore.error('Неверные данные');

            }
        }
    };

    const errorKeys = useMemo(() => Object.keys(errors), [errors])

    return (
        <div className={styles.app}>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
            <Switch/>
            <div className={styles.mainWrapper}>
                <h1>{formType === 'authorization' ? 'Вход в аккаунт' : 'Регистрация'}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
                    <div className={styles.inputsContainer}>
                        {formInputsData[formType].map((inputData) => <Input key={inputData.name}
                                                                            register={register} {...inputData}
                                                                            withError={errorKeys.includes(inputData.name)}/>)}
                    </div>
                    <button
                        type="submit"
                        className={styles.enterButton}>
                        {formType === 'authorization' ? 'войти в свой аккаунт' : 'зарегистрироваться'}
                    </button>
                </form>
            </div>

        </div>
    );
}

export default App;