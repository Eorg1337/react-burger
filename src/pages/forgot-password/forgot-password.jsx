import React from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPass } from "../../services/user/reducer";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = React.useState("");
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const location = useLocation();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: "/" } };
  const sendEmail = (e) => {
    e.preventDefault()
    if (regex.test(emailValue)) {
      dispatch(forgotPass({emailValue}));
      navigate("/reset-password", { state: { from: "/forgot-password" } })
    }
  };
 
  return (
    <div className={styles.password}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form onSubmit={sendEmail}>
      <div className={styles.inputs}>
        <EmailInput
          onChange={onChangeEmail}
          value={emailValue}
          name={"email"}
          isIcon={false}
          placeholder="Укажите e-mail"
        />
      </div>
      <div className={styles.footer}>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
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

export default ForgotPassword;
