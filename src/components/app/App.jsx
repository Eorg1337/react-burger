import React from "react";
import { useEffect,createContext } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Route,Routes, BrowserRouter as Router, useLocation, useParams } from "react-router-dom";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, setActiveIngredient } from "../../services/ingredients/reducer";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import MainPage from "../../pages/main/main";
import { getUserInfo } from "../../services/user/reducer";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import IngredientsPage from "../../pages/ingredients/ingredients";


export const AuthContext = createContext({user: null});

function App() {
  const dispatch = useDispatch();
  let location = useLocation();
  let background = location.state && location.state.background;
  const user = useSelector((state) => state.rootReducer.user?.user.name);
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserInfo())
  }, []);


  return (
    <AuthContext.Provider value={{user}}>
      <div className={style.app}>
        <AppHeader />
        <Routes location={background||location}>
          <Route exact path="/" element={<MainPage/>}/>
          <Route path = "/ingredients/:id" element={<IngredientsPage/>}/>
          <Route  path="/login" element={<ProtectedRouteElement onlyUnAuth>
          <Login/>
          </ProtectedRouteElement>}/>
          <Route exact path="/register" element={<ProtectedRouteElement onlyUnAuth>
          <Register/>
          </ProtectedRouteElement>}/>
          <Route exact path="/forgot-password" element={<ProtectedRouteElement onlyUnAuth>
          <ForgotPassword/>
          </ProtectedRouteElement>}/>
          <Route  path="/reset-password" element={<ProtectedRouteElement onlyUnAuth>
          <ResetPassword/>
          </ProtectedRouteElement>}/>
          <Route  path="/profile" element={<ProtectedRouteElement>
          <Profile/>
          </ProtectedRouteElement>}/>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;


