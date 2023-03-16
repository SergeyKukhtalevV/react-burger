import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUser} from "../services/actions/user";
import {getCookie} from "../utils/utils";

const LoginPage = () => {

  const {accessToken, userInfoFailed} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';
  const [form, setValue] = useState({email: '', password: ''});

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setTimeout(() => {
        navigate(fromPage);
      }, 3000);
    }
  }, // eslint-disable-next-line
    [accessToken]);

  const handleLogin = useCallback(e => {
      e.preventDefault();
      dispatch(getAuthUser(form));
    }, // eslint-disable-next-line
    [form]
  );
  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  }

  return (
    <div className={styles.container}>
      <form className={`${styles.form}`} onSubmit={handleLogin}>
        <h1 className={`text text_type_main-medium`}> Вход </h1>
        <EmailInput extraClass={`mt-6`} placeholder={'E-mail'} value={form.email} name={"email"} onChange={onChange}
                    required={true}/>
        <PasswordInput extraClass={`mt-6`} placeholder={'пароль'} value={form.password} name={"password"}
                       onChange={onChange}
                       icon={"ShowIcon"} required={true}/>
        {accessToken
          ? <div className={styles.container__login}>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Авторизация пользователя успешна
              выполнена!</p>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Вы будете перенаправлены через 3
              секунды </p></div>
          : <div className={styles.container__login}>
            <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}>Войти</Button>
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
