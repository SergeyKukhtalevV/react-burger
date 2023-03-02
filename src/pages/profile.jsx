import React, {useCallback, useState} from 'react';
import {Link, Navigate, NavLink} from "react-router-dom";
import styles from './profile.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const ProfilePage = () => {
  const [form, setValue] = useState({name: '', email: '', password: ''});
  const register = useCallback(e => {
      e.preventDefault();
    }, [form]
  );
  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  }
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <NavLink to={"/profile"} className={`${styles.link} text text_type_main-medium`}>Профиль</NavLink>
          </li>
          <li>
            <NavLink to={"/profile/orders"} className={`${styles.link} text text_type_main-medium`}>История
              заказов</NavLink>
          </li>
          <li>
            <NavLink to={"/"} className={`${styles.link} text text_type_main-medium`}>Выход</NavLink>
          </li>
          <li className={"mt-20 "}>
            <p className={"text text_type_main-default text_color_inactive"}>В этом разделе вы можете
              изменить свои персональные данные</p>
          </li>
        </ul>
        <form className={`${styles.form}`}>
          <Input type={"text"} extraClass={``} placeholder={'Имя'} value={form.name} name={"name"}
                 onChange={onChange} icon={"EditIcon"}/>
          <EmailInput extraClass={`mt-6`} placeholder={'Логин'} value={form.email} name={"email"} onChange={onChange}
                      icon={"EditIcon"}/>
          <PasswordInput extraClass={`mt-6`} placeholder={'пароль'} value={form.password} name={"password"}
                         onChange={onChange}
                         icon={"EditIcon"}/>
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
