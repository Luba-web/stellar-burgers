import React, { FC, useState, useMemo, useEffect, useRef, SyntheticEvent, ChangeEvent } from "react";
import styles from "./profile-form.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { changeUser } from "../../services/actions/user";

interface IInitialState {
 [key: string]: string;
}

const ProfileForm: FC = () => {
  const dispatch = useDispatch();

  const { user, profileRequest, profileFailed } = useSelector(
    (store) => store.user
  );

  const initialUser: IInitialState = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    }),
    [user]
  );

  const [showBtns, setShowBtns] = useState<boolean>(false);
  const [state, setState] = useState<IInitialState>({ ...initialUser });

  const [name, setName] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowBtns(
      (name || email || password) &&
        (state.name !== initialUser.name ||
          state.email !== initialUser.email ||
          state.password !== initialUser.password)
    );
  }, [initialUser, state]);

  //изменение данных
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { target } = e;

    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  //фокус и курсор для пароля
  const handlePasswordClick = () => {
    setTimeout(() => {
      if (inputRefPassword.current) {
        inputRefPassword.current.focus()
      }
    }, 0);
    setPassword(!password);
  };

  //сохранение изменений
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(changeUser(state.name, state.email, state.password));
  };

  //отмена изменений
  const handleResetUser = (e: SyntheticEvent) => {
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
