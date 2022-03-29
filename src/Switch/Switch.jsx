import styles from './Switch.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setFormType} from "../redux/actions/form";

const btnsData = [
    {
        name: 'мой аккаунт',
        type: 'authorization'
    },
    {
        name: 'регистрация',
        type: 'registration'
    }
]

export const Switch = () => {
    const dispatch = useDispatch();
    const formType = useSelector((state) => state.formType)

    const handleClick = (type) => {
        dispatch(setFormType(type))
    }

    return (
        <div className={styles.switchContainer}>
            {
                btnsData.map((btnData) => {
                    const {name, type} = btnData;
                    return <button onClick={() => handleClick(type)}
                                   className={type === formType ? styles.active : ''}>{name}</button>
                })
            }
        </div>
    )
}