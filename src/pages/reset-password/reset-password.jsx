import React,{useEffect} from "react";
import styles from "./reset-password.module.css";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { resetPass } from "../../services/user/reducer";
import { Link, useLocation, useNavigate} from "react-router-dom";

const ResetPassword = () => {
  const [value, setValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const dispatch = useDispatch();
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const onChangeToken = (e) => {
    setValue(e.target.value);
  };
  const location = useLocation();
  
  console.log(location, "reset-password");
  const navigate = useNavigate();
  const inputRef = React.useRef(null);
  const sendNewPass = (e) => {
    e.preventDefault()
    dispatch(resetPass({passwordValue, value}));
  };
 

  console.log(location.pathname)

  return (
    <div className={styles.password}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form onSubmit={sendNewPass}>
      <div className={styles.inputs}>
        <PasswordInput
          onChange={onChangePassword}
          value={passwordValue}
          name={"new_password"}
          extraClass="mb-2"
          placeholder={"Введите новый пароль"}
        />
        <Input
          placeholder={"Введите код из письма"}
          onChange={onChangeToken}
          value={value}
          name={"code"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
      </div>
      <div className={styles.footer}>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
        <div className={styles.footerInfo}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login">
              <Button htmlType="button" type="secondary" size="medium">
                Войти
              </Button>
            </Link>
          </p>
        </div>
      </div>
      </form>
    </div>
  );
};

export default ResetPassword;
