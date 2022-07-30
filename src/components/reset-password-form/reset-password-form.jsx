import React from "react";
import styles from "./reset-password-form.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { postResetPassword } from "../../services/actions/reset-password";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();

  const [valuePass, setValuePass] = React.useState("");
  const [valueToken, setValueToken] = React.useState("");

  const { user } = useSelector((store) => store.user);

  const { resetPasswordRequest, resetPasswordFailed } = useSelector(
    (store) => store.resetPassword
  );
  const { forgotPasswordRequest, forgotPasswordFailed } = useSelector(
    (store) => store.forgotPassword
  );

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postResetPassword(valuePass, valueToken));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  if (forgotPasswordRequest === false && forgotPasswordFailed === false) {
    return (
      <Redirect
        to={{
          pathname: "/forgot-password",
        }}
      />
    );
  }

  if (resetPasswordRequest === false && resetPasswordFailed === false) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  return (
    <div className={styles.reset__content}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className="mb-20" onSubmit={handleSubmit}>
        <div className={`${styles.reset__input} mt-6`}>
          <PasswordInput
            onChange={(e) => {
              handleChange(e, setValuePass);
            }}
            value={valuePass}
            name={"password"}
            placeholder={"Введите новый пароль"}
          />
        </div>
        <div className={`${styles.reset__input} mt-6`}>
          <Input
            onChange={(e) => {
              handleChange(e, setValueToken);
            }}
            placeholder={"Введите код из письма"}
            value={valueToken}
            name={"Token"}
          />
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          className={`text text_type_main-small mt-6`}
        >
          {!resetPasswordRequest ? "Сохранить" : "Сохранение..."}
        </Button>
        {resetPasswordFailed && (
          <div className="text text_type_main-default text_color_error mt-2">
            {resetPasswordFailed}
          </div>
        )}
      </form>
      <p className="text text_type_main-default text_color_inactive mt-6">
        Вспомнили пароль?{" "}
        <Link to={`/login`} className={styles.reset__link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordForm;
