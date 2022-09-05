import React, { SyntheticEvent, useState, FC } from "react";
import styles from "./forgot-password-form.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { forgotPassword } from "../../services/actions/forgot-password";

const ForgotPasswordForm: FC = () => {
  const dispatch = useDispatch();

  const { forgotPasswordSuccess, forgotPasswordRequest } = useSelector(
    (store) => store.forgotPassword
  );

  const [valueEmail, setValueEmail] = useState<string>("");

  const user = useSelector((store) => store.user.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(valueEmail));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  if (forgotPasswordSuccess === true) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }

  return (
    <div className={styles.forgot__content}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className="mb-20" onSubmit={handleSubmit}>
        <div className={`${styles.forgot__input} mt-6`}>
          <Input
            onChange={e => setValueEmail(e.target.value)}
            placeholder={"Укажите e-mail"}
            value={valueEmail}
            name={"email"}
          />
        </div>
        <Button
          type="primary"
          size="medium"
        >
          {!forgotPasswordRequest ? "Восстановить" : "Восстановление...."}
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link to={`/login`} className={styles.forgot__link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
