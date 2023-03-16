import React from 'react';
import styles from './authorization.module.css'
import {Link, NavLink} from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={`text text_type_main-large mt-25`}> Страница не найдена </h1>
        <Link to={"/"} className={`${styles.link} mt-25 text text_type_main-medium`}>Вернуться на главную
          страницу</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
