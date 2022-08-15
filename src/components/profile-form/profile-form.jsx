import { React, useState, useMemo, useEffect, useRef } from "react";
import styles from "./profile-form.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../services/actions/user";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const { user, profileRequest, profileFailed } = useSelector(
    (store) => store.user
  );

  const initialUser = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    }),
    [user]
  );

  const [showBtns, setShowBtns] = useState(false);
  const [state, setState] = useState({ ...initialUser });

  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const inputRefPassword = useRef(null);

  useEffect(() => {
    setShowBtns(
      (name || email || password) &&
        (state.name !== initialUser.name ||
          state.email !== initialUser.email ||
          state.password !== initialUser.password)
    );
  }, [initialUser, state]);

  //изменение данных
  const handleChange = (e) => {
    const { target } = e;

    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  //фокус и курсор для пароля
  const handlePasswordClick = () => {
    setTimeout(() => inputRefPassword.current.focus(), 0);
    setPassword(!password);
  };

  //сохранение изменений
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUser(state.name, state.email, state.password));
  };

  //отмена изменений
  const handleResetUser = (e) => {
    e.preventDefault();
    setState({
      ...initialUser,
    });
  };

  return (
    <form className="mb-20" onSubmit={handleSubmit}>
      <div className={`${styles.input} mt-6`}>
        <Input
          onChange={handleChange}
          placeholder={"Имя"}
          value={state.name}
          name={"name"}
          icon={"EditIcon"}
          type={"text"}
          onIconClick={() => setName(!name)}
          disabled={!name}
        />
      </div>
      <div className={`${styles.input} mt-6`}>
        <Input
          onChange={handleChange}
          placeholder={"Логин"}
          value={state.email}
          name={"email"}
          icon={"EditIcon"}
          type={"email"}
          onIconClick={() => setEmail(!email)}
          disabled={!email}
        />
      </div>
      <div className={`${styles.input} mt-6`}>
        <Input
          ref={inputRefPassword}
          onChange={handleChange}
          placeholder={"Пароль"}
          value={state.password}
          name={"password"}
          icon={"EditIcon"}
          type={"password"}
          onIconClick={handlePasswordClick}
          disabled={!password}
        />
      </div>
      {showBtns && (
        <div className={styles.btns}>
          <Button type="secondary" size="medium" onClick={handleResetUser}>
            Отмена
          </Button>
          <Button type="primary" size="medium">
            {!profileRequest ? "Сохранить" : "Сохранение...."}
          </Button>
        </div>
      )}
      {profileFailed && (
        <div className="text text_type_main-default text_color_error mt-6">
          Ошибка сохранения данных!
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
