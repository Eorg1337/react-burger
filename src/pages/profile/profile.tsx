import React, { useEffect, FC, ChangeEvent, FormEvent } from "react";
import styles from "./profile.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { getUserInfo, logout } from "../../services/user/reducer";
import { useSelector, useDispatch } from "../../services/store";
import { refreshUserInfo } from "../../services/user/reducer";
import OrdersHistory from "../../components/orders-history/orders-history";

type ProfileProps = typeof EmailInput & {
  type: string;
};

const Profile: FC = () => {
  const currentName = useSelector((state) => state.user?.user.name);
  const currentLogin = useSelector((state) => state.user?.user.email);
  const [nameValue, setNameValue] = React.useState(currentName);
  const [loginValue, setLoginValue] = React.useState(currentLogin);
  const [passwordValue, setPasswordValue] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setNameValue(currentName);
    setLoginValue(currentLogin);
  }, [currentLogin, currentName]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValue(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const sendNewInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <form onSubmit={sendNewInfo}>
            <div className={styles.inputs}>
              <EmailInput
                placeholder={"Имя"}
                value={nameValue}
                onChange={onChangeName}
                name={"name"}
                onError={() => {}}
                isIcon={true}
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
                value={passwordValue}
                name={"password"}
                extraClass="mb-2"
                placeholder="Пароль"
                isIcon={true}
              />
              {(nameValue !== currentName ||
                loginValue !== currentLogin ||
                passwordValue) && (
                <div className={styles.acceptButns}>
                  <Button htmlType="submit" type="primary" size="medium">
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
              )}
            </div>
          </form>
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
