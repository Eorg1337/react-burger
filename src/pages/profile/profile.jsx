import React, { useEffect } from "react";
import styles from "./profile.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo, logout } from "../../services/user/reducer";
import { useSelector } from "react-redux";
import { refreshUserInfo } from "../../services/user/reducer";
import OrdersHistory from "./orders-history/orders-history";

const Profile = () => {
  const currentName = useSelector((state) => state.rootReducer.user?.user.name);
  const currentLogin = useSelector(
    (state) => state.rootReducer.user?.user.email,
  );
  const [nameValue, setNameValue] = React.useState(currentName);
  const [loginValue, setLoginValue] = React.useState(currentLogin);
  const [passwordValue, setPasswordValue] = React.useState("YandexPracticum");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setNameValue(currentName);
    setLoginValue(currentLogin);
  }, [currentLogin, currentName]);

  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };
  const onChangeLogin = (e) => {
    setLoginValue(e.target.value);
  };
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const sendNewInfo = () => {
    dispatch(refreshUserInfo({ nameValue, loginValue, passwordValue }));
  };

  const onLogoutUser = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const deleteChanges = () => {
    dispatch(getUserInfo());
    setNameValue(currentName);
    setLoginValue(currentLogin);
  };

  const inputRef = React.useRef(null);
  return (
    <div className={styles.profile}>
      <div className={styles.sideMenu}>
        <NavLink
          to="/profile"
          className={`${
            location.pathname === "/profile"
              ? styles.activeButtons
              : styles.buttons
          } text text_type_main-medium text_color_inactive`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`${
            location.pathname === "/profile/orders"
              ? styles.activeButtons
              : styles.buttons
          } text text_type_main-medium text_color_inactive`}
        >
          История заказов
        </NavLink>
        <a
          className={`text text_type_main-medium text_color_inactive ${styles.buttons}`}
          onClick={() => onLogoutUser()}
        >
          Выход
        </a>
      </div>
      {location.pathname === "/profile" && (
        <>
          <div className={styles.inputs}>
            <EmailInput
              placeholder={"Имя"}
              value={nameValue}
              onChange={onChangeName}
              name={"name"}
              error={false}
              isIcon={true}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
            <EmailInput
              onChange={onChangeLogin}
              name={"email"}
              value={loginValue}
              placeholder="Логин"
              isIcon={true}
              extraClass="mb-2"
            />
            <EmailInput
              onChange={onChangePassword}
              type="password"
              value={passwordValue}
              name={"password"}
              extraClass="mb-2"
              placeholder="Пароль"
              isIcon={true}
            />
            <div className={styles.acceptButns}>
              <Button
                htmlType="reset"
                type="primary"
                size="medium"
                onClick={() =>
                  sendNewInfo(nameValue, loginValue, passwordValue)
                }
              >
                Сохранить
              </Button>
              <Button
                htmlType="reset"
                type="primary"
                size="medium"
                onClick={() => deleteChanges()}
              >
                Отменить
              </Button>
            </div>
          </div>
          <div className={styles.info}>
            <p>В этом разделе вы можете изменить свои персональные данные</p>
          </div>
        </>
      )}
      {location.pathname === "/profile/orders" && <OrdersHistory />}
    </div>
  );
};

export default Profile;
