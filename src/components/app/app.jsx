import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getUserInfo, postToken } from "../../services/actions/user";

import AppHeader from "../app-header/app-header";
import OrderInfoPage from "../order-info-page/order-info-page";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredient,
  NotFound,
  Feed,
  ProfileHistory,
  OrderInfo,
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
  const location = useLocation();

  const refreshToken = localStorage.getItem("token");
  const { user, tokenSuccess } = useSelector((store) => store.user);

  const cookie = getCookie("token");

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
    dispatch({ type: DETAILS_REMOVE });
  };

  const background = location.state?.background;

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
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/ingredients/:id" exact>
          <Ingredient />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderInfo url={"/all"} />
        </Route>

        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <ProfileHistory />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderInfo url={`?token=${cookie}`} />
        </ProtectedRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      {background && (
        <>
          <Route path="/ingredients/:id">
            <Modal title="Детали ингредиента" onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal title="" onClose={closeModal}>
              <OrderInfoPage />
            </Modal>
          </Route>
          <ProtectedRoute path="/profile/orders/:id">
            <Modal title="" onClose={closeModal}>
              <OrderInfoPage />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </div>
  );
};

export default App;
