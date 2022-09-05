import React, { FC, useState, SyntheticEvent } from "react";
import styles from "./register-form.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { postUserRegister } from "../../services/actions/user";

const RegisterForm: FC = () => {
  const dispatch = useDispatch();

  const [valueName, setName] = useState<string>("");
  const [valuePassword, setPassword] = useState<string>("");
  const [valueEmail, setEmail] = useState<string>("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(postUserRegister(valueName, valueEmail, valuePassword));
  };

  const user = useSelector((store) => store.user.user);

  if (user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.register__content}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form className="mb-20" onSubmit={handleSubmit}>
        <div className={`${styles.register__input} mt-6`}>
          <Input
            onChange={e => setName(e.target.value)}
            placeholder={"Name"}
            value={valueName}
            name={"name"}
            type={"text"}
          />
        </div>
        <div className={`${styles.register__input} mt-6`}>
          <Input
            onChange={e => setEmail(e.target.value)}
            placeholder={"Email"}
            value={valueEmail}
            name={"email"}
            type={"email"}
          />
        </div>
        <div className={`${styles.register__input} mt-6`}>
          <PasswordInput
            onChange={e => setPassword(e.target.value)}
            value={valuePassword}
            name={"password"}
          />
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Зарегистрироваться
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link to={`/login`} className={styles.register__link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
