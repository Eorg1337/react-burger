import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';


const AppHeader = () => {
    const location = useLocation();
    const userAuth = useSelector((state)=>state.rootReducer.user?.user.name)
    console.log(userAuth)
        return(
            <header className={`${styles.header}`}>
                <ul className = {styles.nav}>
                    <li className={`mt-4 mb-4 pl-5 pr-5 mr-5 ${styles.nav__item}`}>
                        <div className={`mr-2 ${styles.div}`}>
                            <BurgerIcon type="primary" />
                            <Link to="/" className="text text_type_main-default ml-2 mr-5 mt-4 mb-4">
                                Конструктор
                            </Link>
                        </div>
                        <div className={`ml-10 ${styles.div}`}>
                            <ListIcon type="secondary"/>
                            <a className="text text_type_main-default text_color_inactive ml-2 mr-5 mt-4 mb-4">
                            Лента заказов
                            </a>
                        </div>
                    </li>
                    <li className = {`${styles.logo}`}>
                        <Logo />
                    </li>
                    <li className={`mt-4 mb-4 pl-5 pr-5 ml-5 ${styles.nav__item}`}>
                        <div className={styles.div}>
                            <ProfileIcon type="secondary"/>
                        {userAuth ?  ( 
                            <Link to="/profile" className="text text_type_main-default text_color_inactive ml-2 mt-4 mb-4">
                            Личный кабинет
                            </Link>
                        ) :  (<Link to={location.pathname} className="text text_type_main-default text_color_inactive ml-2 mt-4 mb-4">
                        Личный кабинет
                        </Link>)}
                        </div>
                    </li>
                </ul>
            </header>
        )
        }
    
    export default AppHeader;