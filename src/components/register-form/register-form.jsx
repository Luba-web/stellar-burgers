import { React, useState } from "react";
import styles from "./register-form.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { postUserRegister } from "../../services/actions/user";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [valueName, setName] = useState("");
  const [valuePassword, setPassword] = useState("");
  const [valueEmail, setEmail] = useState("");

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUserRegister(valueName, valueEmail, valuePassword));
  };

  const { user } = useSelector((store) => store.user);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.register__content}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form className="mb-20" onClick={handleSubmit}>
        <div className={`${styles.register__input} mt-6`}>
          <Input
            onChange={(e) => {
              handleChange(e, setName);
            }}
            placeholder={"Name"}
            value={valueName}
            name={"name"}
          />
        </div>
        <div className={`${styles.register__input} mt-6`}>
          <Input
            onChange={(e) => {
              handleChange(e, setEmail);
            }}
            placeholder={"Email"}
            value={valueEmail}
            name={"email"}
          />
        </div>
        <div className={`${styles.register__input} mt-6`}>
          <PasswordInput
            onChange={(e) => {
              handleChange(e, setPassword);
            }}
            value={valuePassword}
            name={"password"}
          />
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          className={`text text_type_main-small mt-6`}
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
