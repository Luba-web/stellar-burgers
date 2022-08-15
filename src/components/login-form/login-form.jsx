import { React, useState } from "react";
import styles from "./login-form.module.css";
import { Link, useLocation, Redirect } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { postUserLogin } from "../../services/actions/user";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [valueLogin, setValueLogin] = useState("");
  const [valuePass, setValuePass] = useState("");

  const user = useSelector((store) => store.user.user);
  const { loginRequest } = useSelector((store) => store.user);

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valueLogin.length > 3 && valuePass.length > 3) {
      dispatch(postUserLogin(valueLogin, valuePass));
    }
  };

  let location = useLocation();

  if (user) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={styles.login__content}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form className="mb-20" onSubmit={handleSubmit}>
        <div className={`${styles.login__input} mt-6`}>
          <Input
            type={"email"}
            onChange={(e) => {
              handleChange(e, setValueLogin);
            }}
            placeholder={"E-mail"}
            value={valueLogin}
            name={"email"}
          />
        </div>
        <div className={`${styles.login__input} mt-6`}>
          <PasswordInput
            onChange={(e) => {
              handleChange(e, setValuePass);
            }}
            value={valuePass}
            name={"password"}
          />
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          className={`text text_type_main-small mt-6`}
        >
          {!loginRequest ? "Войти" : "Вход..."}
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вы - новый пользователь?{" "}
        <Link to={`/register`} className={styles.login__link}>
          Зарегистрироваться
        </Link>
      </p>

      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to={`/forgot-password`} className={styles.login__link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
