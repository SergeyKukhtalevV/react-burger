import React, {useCallback, useEffect, useState, FC} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './authorization.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from '../services/hooks';
import {setRegisterUser} from "../services/actions";

const RegisterPage: FC = () => {

  const {accessToken} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type TFormReg = {
    name: string;
    email: string;
    password: string;
  }

  const [form, setValue] = useState<TFormReg>({name: '', email: '', password: ''});
  useEffect(() => {
    if (accessToken) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [accessToken, navigate]);

  const handleRegister = useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(setRegisterUser(form));
    }, [form, dispatch]
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({...form, [e.target.name]: e.target.value});
  }
  return (
    <div className={styles.container}>
      <form className={`${styles.form}`} onSubmit={handleRegister}>
        <h1 className={`text text_type_main-medium`}> Регистрация </h1>
        <Input type={"text"} extraClass={`mt-6`} placeholder={'Имя'} value={form.name} name={"name"}
               onChange={onChange} required={true}/>
        <EmailInput extraClass={`mt-6`} placeholder={'E-mail'} value={form.email} name={"email"} onChange={onChange}
                    required={true}/>
        <PasswordInput extraClass={`mt-6`} placeholder={'пароль'} value={form.password} name={"password"}
                       onChange={onChange}
                       icon={"ShowIcon"} required={true}/>
        {accessToken
          ? <div className={styles.container__login}>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Регистрация пользователя успешна
              выполнена!</p>
            <p className={`mt-20 text text_type_main-default text_color_active`}>Вы будете перенаправлены на главную
              страницу через 3 секунды </p>
          </div>
          : <div>
            <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
            >Зарегистрироваться</Button>
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
