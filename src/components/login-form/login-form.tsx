import React, { FC, useState, SyntheticEvent} from "react";
import styles from "./login-form.module.css";
import { Link, useLocation, Redirect } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { postUserLogin } from "../../services/actions/user";
import { TLocation } from "../../services/types/data";

const LoginForm: FC = () => {
  const dispatch = useDispatch();

  const [valueLogin, setValueLogin] = useState<string>("");
  const [valuePass, setValuePass] = useState<string>("");

  const user = useSelector((store) => store.user.user);
  const { loginRequest } = useSelector((store) => store.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (valueLogin.length > 3 && valuePass.length > 3) {
      dispatch(postUserLogin(valueLogin, valuePass));
    }
  };

  let location = useLocation<TLocation>();

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
            onChange={e => setValueLogin(e.target.value)}
            placeholder={"E-mail"}
            value={valueLogin}
            name={"email"}
          />
        </div>
        <div className={`${styles.login__input} mt-6`}>
          <PasswordInput
            onChange={e => setValuePass(e.target.value)}
            value={valuePass}
            name={"password"}
          />
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
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
