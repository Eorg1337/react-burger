import React from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AppHeader = () => {
  const location = useLocation();
  const userAuth = useSelector((state) => state.rootReducer.user?.user.name);
  return (
    <header className={styles.header}>
      <ul className={styles.nav}>
        <li className={`${styles.nav__item} mt-4 mb-4 pl-5 pr-5 mr-5`}>
          <div className={`${styles.div} mr-2`}>
            <BurgerIcon type="primary" />
            <NavLink
              to="/"
              className={`${
                location.pathname === "/" ? styles.activeLink : styles.link
              } text text_type_main-default text_color_inactive ml-2 mr-5 mt-4 mb-4`}
            >
              Конструктор
            </NavLink>
          </div>
          <div className={`${styles.div} ml-10`}>
            <ListIcon type="secondary" />
            <NavLink
              to="/orders"
              className={`${
                location.pathname === "/orders"
                  ? styles.activeLink
                  : styles.link
              } text text_type_main-default text_color_inactive ml-2 mr-5 mt-4 mb-4`}
            >
              Лента заказов
            </NavLink>
          </div>
        </li>
        <li className={styles.logo}>
          <Logo />
        </li>
        <li className={`${styles.nav__item} mt-4 mb-4 pl-5 pr-5 ml-5`}>
          <div className={styles.div}>
            <ProfileIcon type="secondary" />
            {userAuth ? (
              <NavLink
                to="/profile"
                className={`${
                  location.pathname.startsWith("/profile")
                    ? styles.activeLink
                    : styles.link
                } text text_color_inactive text_type_main-default ml-2 mt-4 mb-4`}
              >
                Личный кабинет
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={`${
                  styles.link
                } text text_color_inactive text_type_main-default ml-2 mt-4 mb-4`}
              >
                Личный кабинет
              </NavLink>
            )}
          </div>
        </li>
      </ul>
    </header>
  );
};
export default AppHeader;
