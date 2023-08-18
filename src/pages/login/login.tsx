import React, { useEffect, FC, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/user/reducer";
import { useSelector } from "react-redux";

const Login: FC = () => {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const successAuth = useSelector((state: any) => state.rootReducer.user.user.name);

  useEffect(() => {
    if (successAuth) {
      navigate("/");
    }
  }, [successAuth]);

  const onChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onUserLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({emailValue,passwordValue}));
  };
  const inputRef = React.useRef(null);
  return (
    <div className={styles.login}>
      <h2 className={styles.title}>Вход</h2>
      <form onSubmit={onUserLogin}>
      <div className={styles.inputs}>
        <EmailInput
          onChange={onChangeEmail}
          value={emailValue}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={onChangePassword}
          value={passwordValue}
          name={"password"}
          extraClass="mb-2"
        />
        </div>
        <div className={styles.footer}>
        <Button
          htmlType="submit"
          size="medium"
          type= "primary"
        >
          Войти
        </Button>
        <div className={styles.footerInfo}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
            <Link to="/register">
              <Button htmlType="button" type="secondary" size="medium">
                Зарегистрироваться
              </Button>
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
            <Link to="/forgot-password">
              <Button htmlType="button" type="secondary" size="medium">
                Восстановить пароль
              </Button>
            </Link>
            
          </p>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Login;
