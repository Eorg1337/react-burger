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
import { AppDispatch, useDispatch, useSelector } from "../../services/store";
import Feed from "../feed/feed";
import FeedItemDetails from "../feed/feed-item-details/feed-item-details";
import OrdersHistoryDetails from "../orders-history/orders-history-details/orders-history-details";
import FeedOrdersPage from "../../pages/orders/feed-orders";
import ProfileOrdersPage from "../../pages/orders/profile-orders";
import Modal from "../modal/modal";
import { deleteActiveIngredient } from "../../services/ingredients/actions";
import { useNavigate } from "react-router-dom";
import { deleteSelectedIngr } from "../../services/modal/actions";

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clearModal = () => {
    dispatch(deleteSelectedIngr());
  };
  let location = useLocation();
  const locationState = location.state as { background?: Location };
  let background = locationState && locationState.background;
  const user = useSelector((state) => state.user?.user?.name);
  const accessToken = localStorage.getItem("accessToken");
  const handleCloseModal = () => {
    dispatch(deleteActiveIngredient());
    clearModal();
    navigate(`/`);
  };
  const handleCloseModalOrder = () => {
    dispatch(deleteActiveIngredient());
    clearModal();
    navigate(`/feed`);
  };
  const  handleCloseModalProfile = () => {
    dispatch(deleteActiveIngredient());
    clearModal();
    navigate(`/profile/orders`);
  };
  useEffect(() => {
    dispatch(getIngredients());
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, []);
  return  (
  <div className={style.app}>
  <AppHeader />
  <Routes location={background || location}>
    <Route path="/" element={<MainPage />} />
    <Route path="/ingredients/:id" element={<IngredientsPage />} />
    <Route path="/feed/:id" element={<FeedOrdersPage />} />
    <Route path="profile/orders/:id" element={<ProfileOrdersPage />} />
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
    <Route path="*" element={<NotFoundPage />} />
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
      <Route path="/feed" element={<Feed />} />
  </Routes>
    {background && (
        <Routes>
            <Route path="/ingredients/:id" element={<Modal onClose={handleCloseModal}><IngredientDetails /></Modal>} />
            <Route
                path="/profile/orders/:id"
                element={
                    <ProtectedRouteElement>
                      <Modal onClose={handleCloseModalProfile}>
                        <OrdersHistoryDetails />
                      </Modal>
                    </ProtectedRouteElement>
                }
            />
            <Route path="/feed/:id" element={<Modal onClose={handleCloseModalOrder}><FeedItemDetails /></Modal>} />
        </Routes>
    )}
</div>
);
};

export default App;
