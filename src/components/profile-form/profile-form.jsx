import { React, useState } from "react";
import styles from "./profile-form.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { patchUser } from "../../services/actions/user";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const [valueName, setValueName] = useState(user.name);
  const [valuePass, setValuePass] = useState("");
  const [valueEmail, setValueEmail] = useState(user.email);

  const [showBtns, setShowBtns] = useState(false);

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
    setShowBtns(true);
  };

  //сохранение изменений
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUser(valueName, valueEmail, valuePass));
    setShowBtns(false);
  };

  //отмена изменений
  const handleСancelUser = (e) => {
    e.preventDefault();

    setShowBtns(false);
  };

  return (
    <form className="mb-20" onSubmit={handleSubmit}>
      <div className={`${styles.input} mt-6`}>
        <Input
          onChange={(e) => {
            handleChange(e, setValueName);
          }}
          placeholder={"Имя"}
          value={valueName}
          name={"name"}
          icon={"EditIcon"}
        />
      </div>
      <div className={`${styles.input} mt-6`}>
        <Input
          onChange={(e) => {
            handleChange(e, setValueEmail);
          }}
          placeholder={"Логин"}
          value={valueEmail}
          name={"email"}
          icon={"EditIcon"}
        />
      </div>
      <div className={`${styles.input} mt-6`}>
        <Input
          onChange={(e) => {
            handleChange(e, setValuePass);
          }}
          placeholder={"Пароль"}
          value={valuePass}
          name={"Пароль"}
          icon={"EditIcon"}
          type="password"
        />
      </div>
      {showBtns && (
        <div className={styles.btns}>
          <Button type="secondary" size="medium" onClick={handleСancelUser}>
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Cохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
