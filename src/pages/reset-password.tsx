import React, {useCallback, useEffect, useState, FC} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from '../services/hooks';
import {setUserNewPassword} from "../services/actions";

type TFormForgotPass = {
  password: string;
  code: string;
}

const ResetPasswordPage: FC = () => {
  const {userInfoAnswer} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '';

  const [form, setValue] = useState<TFormForgotPass>({password: '', code: ''});
  const handleResetPassword = useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(setUserNewPassword(form));
    }, // eslint-disable-next-line
    [form]
  );
  useEffect(() => {
    if (fromPage !== '/forgot-password') {
      navigate('/login');
    }
    if (userInfoAnswer) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, // eslint-disable-next-line
    [userInfoAnswer]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({...form, [e.target.name]: e.target.value});
  }
  return (
    <div className={styles.container}>
      <form className={`${styles.form}`} onSubmit={handleResetPassword}>
        <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
        <PasswordInput extraClass={`mt-6`} placeholder={'Введите новый пароль'} value={form.password} name={"password"}
                       onChange={onChange}
                       icon={"ShowIcon"} required={true}/>
        <Input type={"text"} extraClass={`mt-6`} placeholder={'Введите код из письма'} value={form.code} name={"code"}
               onChange={onChange} required={true}/>
        {userInfoAnswer
          ? <div className={styles.container__login}>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Пароль успешно изменён.</p>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Вы будете перенаправлены на
              страницу авторизации через 3 секунды </p>
          </div>
          : <div className={styles.container__login}>
            <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
            >Сохранить</Button>
            <p className={`mt-20 text text_type_main-default text_color_inactive`}>Вспомнили пароль?&nbsp;
              <Link to={"/login"}>Войти</Link>
            </p>
          </div>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
