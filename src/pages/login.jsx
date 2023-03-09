import React, {useCallback, useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUser, setRegisterUser} from "../services/actions/user";
import {getCookie} from "../utils/utils";

const LoginPage = () => {

  const {isUserAuth, accessToken, userInfoFailed, userInfoAnswer} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie('token');

  const [form, setValue] = useState({email: '', password: ''});
  useEffect(() => {
    if (accessToken) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [accessToken]);

  const login = useCallback(e => {
      e.preventDefault();
      dispatch(getAuthUser(form));
    }, [form]
  );
  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  }
// useEffect(() => {
//   if (isUserAuth) {
//     navigate('/');
//   }
// }, [isUserAuth]);



  return (
    <div className={styles.container}>
      <form className={`${styles.form}`}>
        <h1 className={`text text_type_main-medium`}> Вход </h1>
        <EmailInput extraClass={`mt-6`} placeholder={'E-mail'} value={form.email} name={"email"} onChange={onChange}/>
        <PasswordInput extraClass={`mt-6`} placeholder={'пароль'} value={form.password} name={"password"}
                       onChange={onChange}
                       icon={"ShowIcon"}/>
        {accessToken
          ? <div className={styles.container__login}>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Авторизация пользователя успешна
              выполнена!</p>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Вы будете перенаправлены на главную
              страницу через 3 секунды </p></div>
          : <div className={styles.container__login}>
            <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
                    onClick={login}>Войти</Button>
            <p className={`mt-20 text text_type_main-default text_color_inactive`}>Вы - новый пользователь?&nbsp;
              <Link to={"/register"}>Зарегистрироваться</Link>
            </p>
            <p className={`mt-4 text text_type_main-default text_color_inactive`}>Забыли пароль?&nbsp;
              <Link to={"/forgot-password"}>Восстановить пароль</Link>
            </p>
          </div>
        }
        {userInfoFailed
          ? <div className={styles.container__login}>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Не правильно введена электронная почта
              или пароль</p>
          </div>
          : null}
      </form>
    </div>
  );
};

export default LoginPage;
