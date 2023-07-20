import React from "react";
import styles from './login.module.css'
import { EmailInput,PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { userLogin } from "../../services/user-login/actions";

const Login = () => {
    const [emailValue, setEmailValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')
    const dispatch = useDispatch();
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  const onUserLogin = () => {
    dispatch(userLogin(emailValue,passwordValue))
  }
    const inputRef = React.useRef(null)
    return(
        <div className={styles.login}>
            <h2 className={styles.title}>Вход</h2>
            <div className={styles.inputs}>
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
            <Button htmlType="reset" type="primary" size="medium" onClick={()=>onUserLogin(emailValue,passwordValue)}>
                Войти
            </Button>
            <div className={styles.footerInfo}>
                <p className="text text_type_main-default text_color_inactive">
                Вы - новый пользователь? 
                <Link to='/register'>
                    <Button htmlType="button" type="secondary" size="medium">
                    Зарегистрироваться
                    </Button>
                </Link>    
                </p>
                <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?
                <Link to='/forgot-password'>
                    <Button htmlType="button" type="secondary" size="medium">
                    Восстановить пароль
                    </Button>
                </Link>
                </p>
            </div>
            </div>
        </div>
    )
}

export default Login