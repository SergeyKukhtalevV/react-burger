import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {setRegisterUser} from "../services/actions/user";
import {setCookie} from "../utils/utils";

const RegisterPage = () => {

  const {
    userInfo,
    userInfoRequest,
    userInfoFailed,
    accessToken,
    refreshToken
  } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({name: '', email: '', password: ''});
  useEffect(() => {
    if (refreshToken) {
      setCookie('token', refreshToken);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [refreshToken])

  const register = useCallback(e => {
      e.preventDefault();
      dispatch(setRegisterUser(form));
    }, [form]
  );
  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  }

  return (
    <div className={styles.container}>
      <form className={`${styles.form}`}>
        <h1 className={`text text_type_main-large`}> Регистрация </h1>
        <Input type={"text"} extraClass={`mt-6`} placeholder={'Имя'} value={form.name} name={"name"}
               onChange={onChange}/>
        <EmailInput extraClass={`mt-6`} placeholder={'E-mail'} value={form.email} name={"email"} onChange={onChange}/>
        <PasswordInput extraClass={`mt-6`} placeholder={'пароль'} value={form.password} name={"password"}
                       onChange={onChange}
                       icon={"ShowIcon"}/>
        {refreshToken
          ? <p className={`mt-20 text text_type_main-default text_color_active`}>Регистрация пользователя успешна
            выполнена! Вы будете перенаправлены на главную страницу через 3 секунды </p>
          : <div>
              <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
                    onClick={register}>Зарегистрироваться</Button>
              <p className={`mt-20 text text_type_main-default text_color_inactive`}>Уже зарегистрированы?&nbsp;
                <Link to={"/login"}>Войти</Link>
              </p>
          </div>
        }
      </form>
    </div>
  );
};

export default RegisterPage;
