import React from "react";
import styles from "./login-form.module.css";
import { Link } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const LoginForm = () => {
  const [valuePass, setValuePass] = React.useState("");
  const [valueEmail, setValueEmail] = React.useState("");

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.login__content}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <form className="mb-20">
        <Input
          onChange={(e) => {
            handleChange(e, setValueEmail);
          }}
          value={valueEmail}
          name={"email"}
          size={"default"}
        />

        <div className={`${styles.login__input} mt-6`}>
          <PasswordInput
            onChange={(e) => {
              handleChange(e, setValuePass);
            }}
            value={valuePass}
            name={"password"}
            size="undefined"
          />
        </div>
        <Button
          type="primary"
          size="small"
          htmlType="submit"
          className={`text text_type_main-small mt-6`}
        >
          Войти
        </Button>
      </form>

      <div>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?{" "}
          <Link to={`/register`}>Зарегистрироваться</Link>
        </p>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to={`/forgot-password`}>Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default LoginForm;
