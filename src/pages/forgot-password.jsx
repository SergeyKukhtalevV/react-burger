import React, {useCallback, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPasswordPage = () => {
  const [form, setValue] = useState({email: ''});
  const forgotPassword = useCallback( e => {
      e.preventDefault();
    }, [form]
  );
  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  }
  return (
    <div className={styles.container}>
      <form className={`${styles.form}`}>
        <h1 className={`text text_type_main-large`}>Восстановление пароля</h1>
        <EmailInput extraClass={`mt-6`} placeholder={'Укажите e-mail'} value={form.email} name={"email"} onChange={onChange}/>
        <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"} onClick={forgotPassword}>Восстановить</Button>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>Вспомнили пароль?&nbsp;
          <Link to={"/login"}>Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
