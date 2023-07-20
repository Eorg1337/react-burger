import React from "react";
import { useEffect } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Route,Routes, BrowserRouter as Router } from "react-router-dom";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/reducer";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import MainPage from "../../pages/main/main";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <Router>
      <div className={style.app}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


