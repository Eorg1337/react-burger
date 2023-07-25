import React,{useEffect} from "react";
import styles from './profile.module.css'
import { Input,EmailInput,PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { logout } from "../../services/user/reducer";
import { useSelector } from "react-redux";
import { refreshUserInfo } from "../../services/user/reducer";


const Profile = () => {
    const currentName = useSelector((state)=> state.rootReducer.user?.user.name)
    const currentLogin = useSelector((state)=> state.rootReducer.user?.user.email)
    const [nameValue, setNameValue] = React.useState(currentName)
    const [loginValue, setLoginValue] = React.useState(currentLogin)
    const [passwordValue, setPasswordValue] = React.useState('YandexPracticum')
    const dispatch = useDispatch();
    const navigate = useNavigate();
  useEffect(()=>{
    setNameValue(currentName);
    setLoginValue(currentLogin);
  },[currentLogin,currentName])

  const onChangeName = e => {
    setNameValue(e.target.value)
  }
  const onChangeLogin = e => {
    setLoginValue(e.target.value)
  }
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }
  const sendNewInfo = () => {
    dispatch(refreshUserInfo({nameValue,loginValue,passwordValue}))
  }

  const onLogoutUser =  () => {
    dispatch(logout());
    navigate("/login");
  }

  
    const inputRef = React.useRef(null)
    return(
        <div className={styles.profile}>
            <div className={styles.sideMenu}>
                <a className={`text text_type_main-medium ${styles.buttons}`}>
                Профиль
                </a>
                <a className={`text text_type_main-medium text_color_inactive ${styles.buttons}`}>
                История заказов
                </a>
                <a className={`text text_type_main-medium text_color_inactive ${styles.buttons}`} onClick={()=>onLogoutUser()}>
                Выход
                </a>
            </div>
            <div className={styles.inputs}>
                <EmailInput
                    placeholder={'Имя'}
                    value={nameValue}
                    onChange={onChangeName}
                    name={'name'}
                    error={false}
                    isIcon={true}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <EmailInput
                    onChange={onChangeLogin}
                    name={'email'}
                    value={loginValue}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
                 />
                <EmailInput
                    onChange={onChangePassword}
                    type="password"
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                    placeholder="Пароль"
                    isIcon={true}
                />
                <div className={styles.acceptButns}>
                <Button htmlType="reset" type="primary" size="medium" onClick={()=>sendNewInfo(nameValue,loginValue,passwordValue)}>
                    Сохранить
                </Button>
                <Button htmlType="reset" type="primary" size="medium">
                    Отменить
                </Button>
                </div>
            </div>
            <div className={styles.info}>
                <p>В этом разделе вы можете изменить 
                    свои персональные данные</p>
            </div>
        </div>
    )
}

export default Profile