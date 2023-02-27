import React, {useCallback, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import styles from './autorization.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const RegisterPage = () => {
  const [form, setValue] = useState({name: '', email: '', password: ''});
  const register = useCallback( e => {
      e.preventDefault();
    }, [form]
  );
  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  }
  return (
    <div className={styles.container}>
      <form className={`${styles.form}`}>
        <h1 className={`text text_type_main-large`}> Регистрация </h1>
        <Input type={"text"} extraClass={`mt-6`} placeholder={'Имя'} value={form.name} name={"name"} onChange={onChange}/>
        <EmailInput extraClass={`mt-6`} placeholder={'E-mail'} value={form.email} name={"email"} onChange={onChange}/>
        <PasswordInput extraClass={`mt-6`} placeholder={'пароль'} value={form.password} name={"password"} onChange={onChange}
                       icon={"ShowIcon"}/>
        <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"} onClick={register}>Зарегистрироваться</Button>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>Уже зарегистрированы?
          <Link to={"/login"}>Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
