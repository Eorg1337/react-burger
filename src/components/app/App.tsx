import React from "react";
import { useEffect, FC } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/reducer";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import MainPage from "../../pages/main/main";
import NotFoundPage from "../../pages/not-found/not-found";
import { getUserInfo } from "../../services/user/reducer";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import IngredientsPage from "../../pages/ingredients/ingredients";
import IngredientDetails from "../details/ingredient-details/ingredient-details";

const App: FC = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const locationState = location.state as {background?: Location};
  let background = locationState && locationState.background;
  const user = useSelector((state: any) => state.rootReducer.user?.user.name);
  const accessToken = localStorage.getItem("accessToken")
  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients());
    if(accessToken){
      // @ts-ignore
      dispatch(getUserInfo());
      }
  }, []);
  return (
      <div className={style.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/ingredients/:id" element={<IngredientsPage />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement onlyUnAuth>
                <Login />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement onlyUnAuth>
                <Register />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement onlyUnAuth>
                <ForgotPassword />
              </ProtectedRouteElement>
            }
          />
          <Route path="*" element={<NotFoundPage/>}/>
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement onlyUnAuth>
                {location.state?.from === "/forgot-password" ? (
                  <ResetPassword />
                ) : (
                  <Navigate to="/forgot-password" replace />
                )}
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                <Profile />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRouteElement>
                <Profile />
              </ProtectedRouteElement>
            }
          />
          {background && (
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
          )}
        </Routes>
      </div>
  );
}

export default App;
