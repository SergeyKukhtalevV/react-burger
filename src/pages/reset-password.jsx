import React, {useCallback, useEffect, useState} from 'react';
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {setUserNewPassword} from "../services/actions/user";

const ResetPasswordPage = () => {
  const {userInfoAnswer} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const  fromPage = location.state?.from?.pathname || '';

  const [form, setValue] = useState({password: '', token: ''});
  const resetPassword = useCallback(e => {
      e.preventDefault();
      dispatch(setUserNewPassword(form));
    }, [form]
  );
  useEffect(() => {
    if(fromPage !== '/forgot-password'){
      navigate('/login');
    }
    if (userInfoAnswer) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [userInfoAnswer]);

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
        {userInfoAnswer
        ? <div className={styles.container__login}>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Пароль успешно изменён.</p>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Вы будете перенаправлены на
              страницу авторизации через 3 секунды </p>
          </div>
        : <div className={styles.container__login}>
            <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
                  onClick={resetPassword}>Сохранить</Button>
            <p className={`mt-20 text text_type_main-default text_color_inactive`}>Вспомнили пароль?&nbsp;
              <Link to={"/login"}>Войти</Link>
            </p>
        </div>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
