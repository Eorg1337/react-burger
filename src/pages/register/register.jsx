import React from "react";
import styles from './register.module.css'
import { Input,EmailInput,PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { userRegister } from "../../services/user/reducer";

const Register = () => {
    const [value, setValue] = React.useState('')
    const [emailValue, setEmailValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')
    const dispatch = useDispatch();
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  const sendUserInfo = (e) => {
    e.preventDefault()
    dispatch(userRegister({emailValue,passwordValue,value}))
  }
    const inputRef = React.useRef(null)
    return(
        <div className={styles.register}>
            <h2 className={styles.title}>Регистрация</h2>
            <form onSubmit={sendUserInfo}>
            <div className={styles.inputs}>
                <Input
                    placeholder={'Имя'}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={onChangePassword}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
            <div className={styles.footer}>
            <Button htmlType="submit" type="primary" size="medium">
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы? 
            <Link to = '/login'>
                <Button htmlType="button" type="secondary" size="medium">
                Войти
                </Button>
            </Link>
            </p>
            </div>
            </form>
        </div>
    )
}

export default Register