import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getUserInfo, postToken } from "../../services/actions/user";

import AppHeader from "../app-header/app-header";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  //Ingredient, нужен ли он????
} from "../../pages";
import styles from "./app.module.css";
import { getCookie } from "../../utils/cookie";

import { DETAILS_REMOVE } from "../../services/actions/details";

import ProtectedRoute from "../protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.user);
  //console.log("userApp", user);

  const cookie = getCookie("token");

  const refreshToken = localStorage.getItem("token");
  const tokenSuccess = useSelector((store) => store.user.user);

  useEffect(() => {
    if (!user && refreshToken && cookie) {
      dispatch(getUserInfo());
    }
    if (!cookie && refreshToken) {
      dispatch(postToken());
    }
    if (cookie && tokenSuccess && refreshToken && !user) {
      dispatch(getUserInfo());
    }
  }, [dispatch, user, cookie, tokenSuccess, refreshToken]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModal = () => {
    history.goBack();
    dispatch({ type: DETAILS_REMOVE }); //можно ли передать тут для удаления если убрать в бургер ингридиент закрытие модалки????
  };

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className={styles.body}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientDetails />
        </Route>
        <Route path="*">404</Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal title="Детали ингредиента" onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </div>
  );
};

export default App;
