import React from "react";
import styles from './reset-password.module.css'
import { PasswordInput, Input,  Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from 'react-redux';
import { resetPass } from "../../services/user/reducer";

const ResetPassword = () => {
    const [value, setValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')
    const dispatch = useDispatch();
    const onChangePassword = e => {
        setPasswordValue(e.target.value)
      }
    const inputRef = React.useRef(null)
    const sendNewPass = () => {
        dispatch(resetPass(passwordValue, value))
    }
    return(
        <div className={styles.password}>
            <h2 className={styles.title}>Восстановление пароля</h2>
            <div className={styles.inputs}>
                <PasswordInput
                    onChange={onChangePassword}
                    value={passwordValue}
                    name={'new_password'}
                    extraClass="mb-2"
                    placeholder={"Введите новый пароль"}
                />
                <Input
                    placeholder={'Введите код из письма'}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'code'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>
            <div className={styles.footer}>
            <Button htmlType="reset" type="primary" size="medium" onClick = {()=>sendNewPass(value, passwordValue)}>
                Сохранить
            </Button>
            <div className={styles.footerInfo}>
                <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? 
                    <Button htmlType="button" type="secondary" size="medium">
                    Войти
                    </Button>
                </p>
            </div>
            </div>
        </div>
    )
}

export default ResetPassword