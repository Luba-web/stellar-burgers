//ошибка 404
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <div className={`${styles.container} text text_type_main-medium`}>
      <h2>Посадка запрещена! 404 Код</h2>
      <p>Эта станция временно не работает!</p>
      <br />
      <br />
      <Link to="/">
        <Button type="primary">Летим домой</Button>
      </Link>
    </div>
  );
};

export default NotFound;
