import React, {useCallback, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const LoginPage = () => {
  const [form, setValue] = useState({email: '', password: ''});
  const login = useCallback( e => {
    e.preventDefault();
  }, [form]
  );
  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  }
  return (
    <div className={styles.container}>
      <form className={`${styles.form}`}>
        <h1 className={`text text_type_main-large`}> Вход </h1>
        <EmailInput extraClass={`mt-6`} placeholder={'E-mail'} value={form.email} name={"email"} onChange={onChange}/>
        <PasswordInput extraClass={`mt-6`} placeholder={'пароль'} value={form.password} name={"password"} onChange={onChange}
                       icon={"ShowIcon"}/>
        <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"} onClick={login}>Войти</Button>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>Вы - новый пользователь?&nbsp;
          <Link to={"/register"}>Зарегистрироваться</Link>
        </p>
        <p className={`mt-4 text text_type_main-default text_color_inactive`}>Забыли пароль?&nbsp;
          <Link to={"/forgot-password"}>Восстановить пароль</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
