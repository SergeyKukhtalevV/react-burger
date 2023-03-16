import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getUserNewPassword, GET_USER_NEW_PASSWORD_INIT} from "../services/actions/user";

const initialFormState = {
  email: ''
}

const ForgotPasswordPage = () => {

  const {userInfoAnswer} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formValues, setFormValue] = useState(initialFormState);
  const handleFormForgotPassword = (e) => {
    e.preventDefault();
    dispatch(getUserNewPassword(formValues))
  }

  useEffect(() => {
    if (userInfoAnswer) {
      setTimeout(() => {
        dispatch({type: GET_USER_NEW_PASSWORD_INIT});
        navigate('/reset-password', {state: {from: location}});
      }, 3000);
    }
  }, [dispatch, userInfoAnswer]);
  const onChange = (e) => {
    setFormValue({...formValues, [e.target.name]: e.target.value});
  }
  return (
    <div className={styles.container}>
      <form className={`${styles.form}`} onSubmit={handleFormForgotPassword}>
        <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
        <EmailInput extraClass={`mt-6`} placeholder={'Укажите e-mail'} value={formValues.email} name={"email"}
                    onChange={onChange} required={true}/>
        {userInfoAnswer
          ? <div className={styles.container__login}>
            <p className={`mt-20 text text_type_main-default text_color_active`}>На введенную почту отправлена
              инструкция по восстановлению.</p>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Вы будете перенаправлены на
              страницу восстановления пароля через 3 секунды </p>
          </div>
          : <div className={styles.container__login}>
            <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
            >Восстановить</Button>
            <p className={`mt-20 text text_type_main-default text_color_inactive`}>Вспомнили пароль?&nbsp;
              <Link to={"/login"}>Войти</Link>
            </p>
          </div>}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
