import React, {useCallback, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPasswordPage = () => {
  const [form, setValue] = useState({password: ''});
  const resetPassword = useCallback(e => {
      e.preventDefault();
    }, [form]
  );
  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  }
  return (
    <div className={styles.container}>
      <form className={`${styles.form}`}>
        <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
        <PasswordInput extraClass={`mt-6`} placeholder={'Введите новый пароль'} value={form.password} name={"password"}
                       onChange={onChange}
                       icon={"ShowIcon"}/>
        <Input type={"text"} extraClass={`mt-6`} placeholder={'Введите код из письма'} value={form.code} name={"code"}
               onChange={onChange}/>
        <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
                onClick={resetPassword}>Сохранить</Button>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>Вспомнили пароль?&nbsp;
          <Link to={"/login"}>Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
