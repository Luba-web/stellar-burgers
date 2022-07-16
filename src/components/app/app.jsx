import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

import AppHeader from "../app-header/app-header";
import { Home, Login } from "../../pages";
import styles from "./app.module.css";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const close = () => {
    history.replace({ pathname: "/" });
  };

  console.log(close);

  return (
    <div className={styles.body}>
      <AppHeader />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
