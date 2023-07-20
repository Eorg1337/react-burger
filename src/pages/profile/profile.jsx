import React from "react";
import styles from './profile.module.css'
import { Input,EmailInput,PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'


const Profile = () => {
    const [nameValue, setNameValue] = React.useState('')
    const [loginValue, setLoginValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')
    const dispatch = useDispatch();

  const onChangeName = e => {
    setNameValue(e.target.value)
  }
  const onChangeLogin = e => {
    setLoginValue(e.target.value)
  }
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  
    const inputRef = React.useRef(null)
    return(
        <div className={styles.profile}>
            <div className={styles.sideMenu}>
                <p className={`text text_type_main-medium ${styles.buttons}`}>
                Профиль
                </p>
                <p className={`text text_type_main-medium text_color_inactive ${styles.buttons}`}>
                История заказов
                </p>
                <p className={`text text_type_main-medium text_color_inactive ${styles.buttons}`}>
                Выход
                </p>
            </div>
            <div className={styles.inputs}>
                <EmailInput
                    placeholder={'Имя'}
                    onChange={onChangeName}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    isIcon={true}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <EmailInput
                    onChange={onChangeLogin}
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
                 />
                <EmailInput
                    onChange={onChangePassword}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                    placeholder="Пароль"
                    isIcon={true}
                />
            </div>
            <div className={styles.info}>
                <p>В этом разделе вы можете изменить 
                    свои персональные данные</p>
            </div>
        </div>
    )
}

export default Profile