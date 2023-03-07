import React, {useCallback, useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getUserNewPassword, GET_USER_NEW_PASSWORD_INIT} from "../services/actions/user";

const ForgotPasswordPage = () => {

  const {userInfoAnswer} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({email: ''});
  const forgotPassword = useCallback(e => {
      e.preventDefault();
      dispatch(getUserNewPassword(form))
    }, [form]
  );
  useEffect(() => {
    if (userInfoAnswer) {
      setTimeout(() => {
        dispatch({type: GET_USER_NEW_PASSWORD_INIT});
        navigate('/reset-password');
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
        <EmailInput extraClass={`mt-6`} placeholder={'Укажите e-mail'} value={form.email} name={"email"}
                    onChange={onChange}/>
        {userInfoAnswer
          ? <div className={styles.container__login}>
            <p className={`mt-20 text text_type_main-default text_color_active`}>На введенную почту отправлена
              инструкция по восстановлению.</p>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Вы будете перенаправлены на
              страницу восстановления пароля через 3 секунды </p>
          </div>
          : <div className={styles.container__login}>
            <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
                    onClick={forgotPassword}>Восстановить</Button>
            <p className={`mt-20 text text_type_main-default text_color_inactive`}>Вспомнили пароль?&nbsp;
              <Link to={"/login"}>Войти</Link>
            </p>
          </div>}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
